
// Минимальная ширина страницы
const minWidth = 320;
// Ширина полотна (макета)
const maxWidth = 1390;
// Ширина ограничивающего контейнера (0 = нет ограничения)
const maxWidthContainer = 0;
// Общий отступ у контейнера
// (30 = по 15px слева и справа, 0 = нет отступа)
const containerPadding = 30;
// Ширина срабатывания первого брейкпоинта
const containerWidth = maxWidthContainer + containerPadding;

const vars = {
	// Размеры макета
	minWidth,
	maxWidth,
	maxWidthContainer,
	containerPadding,
	containerWidth,

	// Цвета сайта
	mainColor: '#473F3C',
	logoLight: '#DAD7E5',
	lightGreen: '#8B987F',
	darkGreen: '#647059',
	accent: '#E9BE76',
	dark: '#584A45',
	text: '#473F3C',
	whiteColor: '#FFFFFF',
	blackColor: '#000000',
	adminLayer: '#D9D9D9',
	placeholderColor: '#A8A8A8',
	buttonTopColor: '#A3AA9C',
	buttonBottomColor: '#647059',
	buttonTopBottomDarkColor: '#3E3938',
	redColor: '#FF0000',
	searchBackgroundColor: '#E3E3E3',
	buttonDisabledColor: '#A3AA9C',
	formHaveAccountColor: '#46459B',
	errorPageRadialStart: '#b0b6ab',
	errorPageRadialEnd: '#8B987F',
	errorPageErrorCode: '#706259',
	overlay: '#242424',
	
	
	// переменные для проекта
	headerPadding: 5,		// размер общего padding в шапке
	informerShowTime: 3000,	// время показа информера
	informerAdditionalTimeAfterHide: 150,	// дополнительное время для скрытия элементов внутри информера, когда он уже закатился за экран
	cubic: 'cubic-bezier(0.5, -1, 0.5, 2)',	// анимация
};



export default vars;