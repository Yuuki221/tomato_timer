const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for testing if the username has duplicate
	when user register for the website 
*/

router.get('/:newUsername', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query("SELECT * FROM name_password WHERE user_name = '" 
						 + req.params.newUsername + "'", 
						 (error, result, fields) => {
				if(result.length > 0){
					res.send({ duplicated: true });
				}else{
					res.send({ duplicated: false });
				}
				connection.release();
		});
	});
});

module.exports = router;