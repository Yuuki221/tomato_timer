const express = require('express');
const router = express.Router();
const DataPool = require('./config.js');

const app = express();

app.get('/users/:name', (request, result, fields) => {
	const username = request.params.name;
	DataPool.query('SELECT * FROM name_passwrd WHERE user_name = ?', username, (error, result) => {
		if(error) throw error;
		console.log('The solution is: ', results[0]);
	});
});

module.exports = router;