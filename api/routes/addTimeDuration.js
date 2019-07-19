const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for add total time duration for date and user 
*/

router.get('/curDate/:date/userID/:userId', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		let resembleDate = req.params.date.split('-');
		let revisedDate = resembleDate[0] + '-' + 
						  (Number(resembleDate[1])<10? '0'+resembleDate[1] : resembleDate[1]) + 
						  '-' + resembleDate[2];
		let newTaskNumber = 1;
		let recordYear, recordMonth, recordDay;

		recordYear = Number(resembleDate[0]);
		recordMonth = Number(resembleDate[1]);
		recordDay = Number(resembleDate[2]);

		connection.query("SELECT * FROM timer_duration WHERE " + 
			" user_id = " + req.params.userId + 
			" AND record_date = '" + revisedDate + "'", (error, result, fields) => {
			if(result && result.length > 0){
				newTaskNumber+=result[0].duration_time;
				connection.query("UPDATE timer_duration SET duration_time = "
				  + newTaskNumber + 
				  " WHERE user_id = '" + req.params.userId + "' AND " + 
				  " record_date = '" + revisedDate + "';", (error, result, fields) => {
				  	  console.log(result);
				});
				connection.release();
			}else{
				connection.query("INSERT INTO timer_duration (user_id, record_date, duration_time, record_year, record_month, record_day) VALUES ('"
				  + req.params.userId + "', '"
				  + revisedDate + "', '"
				  + newTaskNumber + ", "
				  + recordYear + ", "
				  + recorMonth + ", "
				  + recordDay + 
				"')", (error, result, fields) => {
					console.log(result);
				});
				connection.release();
			}
		});
		res.send({ message: 'addTaskNumber'})
	});
});

module.exports = router;