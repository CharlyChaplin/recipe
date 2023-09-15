import db from '../db.js';





class ResetSeq {

	static async resetSequence(tableName) {
		const max = await db.query(`SELECT MAX(id) FROM ${tableName};`);
		const reset = await db.query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${max.rows[0].max + 1};`);
	}

}


export default ResetSeq;