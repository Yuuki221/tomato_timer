const express = require('express');
const router = express.Router();
const pool = require('./config.js');
/*
	API for get the user passwrod when enter username 
*/
router.get('/:name', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query("SELECT * FROM name_passwrd WHERE user_name = '" + req.params.name + "'", (error, result, fields) => {
			if(error){
				res.send(error);
			}else if(result.length > 0){
				res.send({ 
					username: result[0].user_name,
					password: result[0].passwrd,
					userId: result[0].user_id
				});
			}else if(result.length == 0){
				res.send({
					message: 'wrong username or password'
				})
			}
			connection.release();
		});
	});
});

module.exports = router;