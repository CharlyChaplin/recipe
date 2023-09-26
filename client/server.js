const express = require('express');
const path = require('path');


const PORT = 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
	console.log(`Hello (${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()})`);
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => console.log(`Started on port ${PORT}`));