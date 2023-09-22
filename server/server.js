import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import db from './db.js';
import router from './routers/index.js';
import errorMiddleware from './middlewares/error-middleware.js';
import fileUpload from 'express-fileupload';


const PORT = config().parsed.PORT || 5000;

if (!fs.existsSync('static')) fs.mkdirSync('./static', err => console.log(err));

const app = express();


var corsOptions = {
	origin: 'https://lexun.ru',
	credentials: true,
}


app.use(express.json());
app.use(cors(corsOptions));
app.use('/test', (req, res) => res.json("Hello from server!"));
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }));
app.use('/', router);

app.use(errorMiddleware);
app.listen(PORT, console.log(`Server has started on port ${PORT}`));

db.connect()
	.then(_ => console.log("=============== DB OK ==============="))
	.catch(err => console.log(`Error DB (${err})`));