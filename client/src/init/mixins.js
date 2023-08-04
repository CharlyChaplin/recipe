import Vars from "./vars.js";


export const em = (px, current = 16) => `${px / current}em`;


export const rem = px => `${px / 16}rem`;

export const textclip = strcount => {
	return strcount === 0
		? `
		overflow: visible;
		-ms-line-clamp: unset;
		-webkit-line-clamp: unset;
		line-clamp: unset;
	`
		: `
		-ms-text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		overflow: hidden;
		-ms-line-clamp: ${strcount};
		-webkit-line-clamp: ${strcount};
		line-clamp: ${strcount};
		display: -webkit-box;
		display: box;
		word-wrap: break-word;
		-webkit-box-orient: vertical;
		box-orient: vertical;
	`
};

export const anim = (speed = 0.25, easeInOut = "ease-in-out", all = "all", delay = 0) => {
	return `
		-webkit-transition: ${all} ${speed}s ${easeInOut} ${delay}s;
		-o-transition: ${all} ${speed}s ${easeInOut} ${delay}s;
		-moz-transition: ${all} ${speed}s ${easeInOut} ${delay}s;
		transition: ${all} ${speed}s ${easeInOut} ${delay}s;
	`
};

export const adaptiveValue = (property, startSize, minSize, keepSize = 0, widthFrom = Vars.containerWidth, widthTo = Vars.minWidth) => {
	if (startSize === 0) startSize = 0.000001;
	if (minSize === 0) minSize = 0.000001;

	// Для calc();
	const addSize = (startSize - minSize) / 16;

	if (widthFrom === Vars.containerWidth && Vars.maxWidthContainer === 0) widthFrom = Vars.maxWidth;

	// Брейк-поинты в EM
	const widthFromMedia = em(widthFrom);
	const widthToMedia = em(widthTo);

	// Формула плавающего значения
	// Источник: https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
	const slope = (startSize - minSize) / (widthFrom - widthTo);
	const yIntersection = (((-1) * widthTo) * slope) + minSize;
	if (yIntersection === 0) yIntersection = 0.000001;
	const flyValue = rem(yIntersection) + " + " + slope * 100 + "vw";

	let propertyValue;
	// Получение значения свойства
	propertyValue = `clamp(${rem(minSize)}, ${flyValue}, ${rem(startSize)})`;
	// Если отрицательные значения
	if (minSize > startSize) propertyValue = `clamp(${rem(startSize)}, ${flyValue}, ${rem(minSize)})`;

	let out = '';
	// Устанавливаем значение по умолчанию
	if (keepSize !== 1 && keepSize !== 3) {
		out = `@media (min-width: ${widthFromMedia}) {
					${property}: ${rem(startSize)};
				}
		`;
	}

	if (keepSize !== 1 && keepSize !== 2) {
		out += `@media (max-width: ${widthToMedia}) {
					${property}: ${rem(minSize)};
				}
		`;
	}

	out += `@media(min-width: ${widthToMedia}) and (max-width: ${widthFromMedia}) {
					@supports (${property}: ${propertyValue}) {
						${property}: ${propertyValue};
					}
					@supports not (${property}: ${propertyValue}) {
						${property}: calc(${rem(minSize)} + ${addSize} * (100vw - ${rem(widthTo)}) / (${widthFrom / 16}) - (${widthTo / 16})  );
					}
			}
	`;
	return out;
}
