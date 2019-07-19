const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for add timer number for date and user 
*/

router.get('/curDate/:date/userId/:userId', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		let newTimerItems = 1;
		let resembleDate = req.params.date.split('-');
		let recordYear, recordMonth, recordDay;
		let revisedDate = resembleDate[0] + '-' + 
						  ( Number(resembleDate[1])<10? '0'+resembleDate[1] : resembleDate[1]) + 
						  '-' + resembleDate[2];

		recordYear = Number(resembleDate[0]);
		recordMonth = Number(resembleDate[1]);
		recordDay = Number(resembleDate[2]);

		connection.query("SELECT * FROM timer_number WHERE user_id = " + 
						 req.params.userId + " AND record_date = '" + 
						 revisedDate + "'", (error, result, fields) => {
			
			if( result.length > 0 ){
				newTimerItems+=result[0].timer_number; 
				connection.query("UPDATE timer_number SET timer_number = "
				  + newTimerItems + 
				  " WHERE user_id = '" + req.params.userId + "' AND " + 
				  " record_date = " + "'" + revisedDate + "';", (error, result, fields) => {
				  	 console.log(result);
				  });
				connection.release();
			}else{
				connection.query("INSERT INTO timer_number (user_id, record_date, timer_number, record_year, record_month, record_day) VALUES ('"
				  + req.params.userId + "', '" 
				  + revisedDate + "', '"
				  + newTimerItems + ", "
				  + recordYear + ", "
				  + recordMonth + ", "
				  + recordDay + 
				"')", (error, result, fields) => {
					console.log(result);
				});
				connection.release();
			}
	    });
		res.send({ message: " addTimerNumber"});
	});
});

module.exports = router;

