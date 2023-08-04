import db from '../db.js';





class ResetSeq {

	static resetSequence(tableName) {
		db.query(`SELECT MAX(id) FROM ${tableName};`)
			.then(resp => db.query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${resp.rows[0].max + 1};`));

	}

}


export default ResetSeq;