// Вспомогательные модули блокировки прокрутки и прыжка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;

function bodyLockToggle(delay = 500) {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}

function bodyUnlock(delay = 500) {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
			// удаляем атрибут 'class', если он пуст
			if (!document.documentElement.classList.length) {
				document.documentElement.removeAttribute('class');
			}
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

function bodyLock(delay = 500) {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('#root').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('#root').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Модуль работы по меню (бургер) =======================================================================================================================================================================================================================

function menuAction(e) {
	if (bodyLockStatus && e.target.closest('.icon-menu')) {
		bodyLockToggle();
		document.documentElement.classList.toggle("menu-open");
	}
}

export function menuClose() {
	bodyLockToggle();
	document.documentElement.classList.toggle("menu-open");
}


export function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", menuAction);
	};
};

