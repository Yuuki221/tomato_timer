const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for sign up tomato timer app
*/

router.get('/username/:name/password/:pwd', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query("SELECT * FROM name_passwrd WHERE user_name = '" + req.params.name + "'", (error, result, field) => {
			console.log(result.length);
			if(error){
				console.log(error);
			}else if(result.length == 0){
				connection.query("INSERT INTO name_passwrd (user_name, passwrd) VALUES " + "('" + req.params.name + "', '" + req.params.pwd + "');", (error, result, field) => {
					if(error){
						console.log(error);
					}else{
						res.send(result);
					}
				});
			}else if(result.length > 0){
				res.send({ message: 'duplicated username detected' });
			}
		});
	});
});

module.exports = router;
