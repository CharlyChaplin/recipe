export function datePrepare(val) {
	const time = new Date(val);

	let day = time.getDate();
	let month = time.getMonth() + 1;
	let year = time.getFullYear();

	day = String(day < 10 ? '0' + day : day);
	month = String(month < 10 ? '0' + month : month);
	year = String(year < 10 ? '0' + year : year);

	return `${day}.${month}.${year}`;
};

// принимает формат 2023-08-15
// возвращает формат 15.08.2023
export function datePrepareForFrontend(val) {
	const time = new Date(val);

	let day = time.getDate();
	let month = time.getMonth() + 1;
	let year = time.getFullYear();

	day = String(day < 10 ? '0' + day : day);
	month = String(month < 10 ? '0' + month : month);
	year = String(year < 10 ? '0' + year : year);

	return `${day}.${month}.${year}`;
};

// принимает формат 15.08.2023
// возвращает формат 2023-08-15
export function datePrepareForDB(val) {
	const time = new Date(val.split('.').reverse().join('-'));

	return time;
};