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