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


app.use(express.json());
app.use(cors({ credentials: true, origin: "http://lexun.ru" }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://lexun.ru');
	res.header(
		'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
	);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
	next();
});
// app.use(cors({ credentials: true, origin: "recipe-front-ten.vercel.app:3000" }));
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }));
app.use('/', router);
app.use(errorMiddleware);

app.listen(PORT, console.log(`Server has started on port ${PORT}`));

db.connect()
	.then(_ => console.log("=============== DB OK ==============="))
	.catch(err => console.log(`Error DB (${err})`));