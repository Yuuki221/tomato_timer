const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for insert username and password into database 
*/

router.post('/username/:name/pwd/:passwrd', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query("INSERT INTO name_passwrd(user_name, passwrd) VALUES ('" 
						 + req.params.name + "', '" 
						 + req.params.passwrd + "')", (error, result, fields) => {
						 	res.send({result});
						 	connection.release();
						 });
	});
});

module.exports = router;




