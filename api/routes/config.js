const mysql = require('mysql');

const config = {
	connectionLimit: 10,
	host: 
	user: 
	password: 
	database: 'tomato_timer'
};
const pool = mysql.createPool(config);
module.exports = pool;


