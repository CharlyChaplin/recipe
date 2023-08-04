export class ItcCollapse {
	constructor(target, trigger, duration = 200) {
		if (trigger) this._trigger = trigger;
		this._target = target;
		this._duration = duration;
		this._body = document.body;
	}
	show() {
		let trg;
		if (this._trigger) trg = this._trigger;
		const el = this._target;
		if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
			return;
		}
		el.classList.remove('collapse');
		const height = el.offsetHeight;
		el.style.height = 0;
		el.style.overflow = 'hidden';
		el.style.transition = `height ${this._duration}ms linear`;
		el.classList.add('collapsing');
		el.offsetHeight;
		if (trg) trg.classList.add('opened');
		el.style.height = `${height}px`;
		window.setTimeout(() => {
			el.classList.remove('collapsing');
			el.classList.add('collapse');
			el.classList.add('collapse_show');
			el.style.height = '';
			el.style.transition = '';
			el.style.overflow = '';
		}, this._duration);
	}
	hide() {
		let trg;
		if (this._trigger) trg = this._trigger
		const el = this._target;
		if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
			return;
		}
		el.style.height = `${el.offsetHeight}px`;
		el.offsetHeight;
		el.style.height = 0;
		el.style.overflow = 'hidden';
		el.style.transition = `height ${this._duration}ms linear`;
		el.classList.remove('collapse');
		el.classList.remove('collapse_show');
		if (trg) trg.classList.remove('opened');

		if (trg) trg.classList.add('closing');

		el.classList.add('collapsing');
		window.setTimeout(() => {
			trg.classList.remove('closing');

			el.classList.remove('collapsing');
			el.classList.add('collapse');
			el.style.height = '';
			el.style.transition = '';
			el.style.overflow = '';
		}, this._duration);
	}
	toggle() {
		this._target.classList.contains('collapse_show') ? this.hide() : this.show();
	}
}
