const express = require('express');
const router = express.Router();
const pool = require('./config.js');

/*
	API for retrieve data for stats page use 
*/

let computeTotalTimerNumber = (timerNumArr) => {
	let timerNum = timerNumArr;
	let timerNumReducer = (accumulator, currentValue) => {
		return accumulator + Number(currentValue.timer_number);
	};
	return timerNum.reduce(timerNumReducer, 0);
};

let computeTotalTaskNumber = (taskNumArr) => {
	let taskNum = taskNumArr;
	let taskNumReducer = (accumulator, currentValue) => {
		return accumulator + Number(currentValue.duration_time);
	};
	return taskNum.reduce(taskNumReducer, 0);
};

router.get('/startDate/:date_start/endDate/:date_end/userID/:id', (req, res, next) => {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		let rawStartDate = req.params.date_start.split('-'),
			rawEndDate = req.params.date_end.split('-'),
			startYear, startMonth, startDay,
			endYear, endMonth, endDay,
			finalRes = {},
			userId = req.params.id;

			startYear = Number(rawStartDate[0]) > 9? rawStartDate[0] : '0'+rawStartDate[0];
			startMonth = Number(rawStartDate[1]) > 9? rawStartDate[1] : '0'+rawStartDate[1];
			startDay = Number(rawStartDate[2]) > 9? rawStartDate[2] : '0'+rawStartDate[2];

			endYear = Number(rawEndDate[0]) > 9? rawEndDate[0] : '0'+rawEndDate[0];
			endMonth = Number(rawEndDate[1]) > 9? rawEndDate[1] : '0'+rawEndDate[1];
			endDay = Number(rawEndDate[2]) > 9? rawEndDate[2] : '0'+rawEndDate[2];

		

		connection.query("SELECT * FROM timer_number WHERE user_id= " + userId + 
						 " and record_date >= '" + startYear + '-' + startMonth + '-' + startDay + "'" +
						 " and record_date <= '" + endYear + '-' + endMonth + '-' + endDay + "'"
						 , (error, result, fields) => {
						 	if(error){
						 		console.log(error);
						 	}else{
						 		finalRes['timer_number'] = computeTotalTimerNumber(result);
						 		finalRes['timerNum'] = result;
						 		connection.query("SELECT * FROM timer_duration WHERE user_id= " + userId + 
						 						" and record_date >= '" + startYear + '-' + startMonth + '-' + startDay + "'" + 
						 						" and record_date <= '" + endYear + '-' + endMonth + '-' + endDay + "'" 
												, (error, result, fields) => {
													finalRes['timer_duration'] = computeTotalTaskNumber(result);
													finalRes['taskNum'] = result;
													res.send(finalRes);
								});
						 	}
						 	connection.release();					
		});
	});
});

module.exports = router;