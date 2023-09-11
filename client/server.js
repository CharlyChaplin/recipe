import express from 'express';
import path from 'path';


const PORT = 8080;

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
	console.log("hello");
	res.sendFile('./build/index.html')
});

app.listen(PORT);