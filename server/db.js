import pkg from 'pg';
import { config } from 'dotenv';


const { DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = config().parsed;

const db = new pkg.Pool({
	database: DB_DATABASE,
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PASSWORD
})


export default db;