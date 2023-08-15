function limitText(text, val) {
	return text.split(' ').slice(0, val).join(' ').concat("...");
}


export default limitText;