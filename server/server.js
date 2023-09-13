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
	// optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true
 }


app.use(express.json());
app.use(cors(corsOptions));
app.use('/test', (req, res) => res.json("Hello from server!"));
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }));
app.use('/', router);
app.use(errorMiddleware);

// app.all('*', function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", req.headers.origin); // Переход от исходного * к источнику текущего запроса
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	res.header("Access-Control-Allow-Credentials", true); // Разрешить отправку файлов cookie
// 	next();
// });

app.listen(PORT, console.log(`Server has started on port ${PORT}`));

db.connect()
	.then(_ => console.log("=============== DB OK ==============="))
	.catch(err => console.log(`Error DB (${err})`));