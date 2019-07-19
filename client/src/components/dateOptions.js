import React from 'react';
import '../css/index.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const MthToDayMatch = {
	'1': 31, '2-1': 28, '2-2': 29, '3': 31,
	'4': 30, '5': 31,   '6': 30,   '7': 31,
	'8': 31, '9': 30,   '10': 31,  '11': 30, 
	'12': 31
}

 
class DateOptions extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			openDropdown: false,
			username: this.props.username,
			password: this.props.password,
			userID: this.props.userID,
			startYearValue: new Date().getFullYear(),
			startMonthValue: new Date().getMonth()+1,
			startDayValue: new Date().getDate(),
			endYearValue: new Date().getFullYear(),
			endMonthValue: new Date().getMonth()+1,
			endDayValue: new Date().getDate()
		};
		this.setAllData = this.props.updateStat;
	}

	handleDateBtnClick = () => {
		this.setState((prevState) => {
			return { openDropdown: !prevState.openDropdown };
		});
	}

	handleClickAway = () => {
		this.setState((prevState) => {
			return { openDropdown: false };
		})
	}

	handleChange = () => {
		this.setState((prevState) => {
			return {}
		})
	}

	generateYrMenuItem = () => {
		let yrMenuArr = this.generateNumArr(20, 2018);	
		return yrMenuArr.map(i => {
			return <MenuItem key={'yr'+i} value={i}>{i}</MenuItem>
		});
	}

	generateMonthMenuItem = () => {
		let monMenuArr = this.generateNumArr(12, 1);
		return monMenuArr.map(i => {
			return <MenuItem key={'mon'+i} value={i}>{i}</MenuItem>
		});
	}

	generateDayMenuItem = (month, year) => {
		month = Number(month);
		year = Number(year);
		if(month === 2){
			if(year%4 === 0){
				month = '2-2';
			}else{
				month = '2-1';
			}
		}
		let range = MthToDayMatch['' + month];	
		let dayMenuArr = this.generateNumArr(range, 1);	
		return dayMenuArr.map(i => {
			return <MenuItem key={'day'+i} value={i}>{i}</MenuItem>
		});
	}

	generateNumArr = (range, init) => {
		const numArr = [], start = init;
		for(let idx=0; idx<range; idx++){ numArr.push(start+idx); }
		return numArr;
	}

	handleStartYearChange = (event) => {
		console.log(event.target.value);
		this.setState((prevState) => {
			return {
				startYearValue: event.target.value
			}
		})
	}

	handleStartMonthChange = (event) => {
		console.log(event.target.value);
		this.setState((prevState) => {
			return {
				startMonthValue: event.target.value
			}
		});
	}

	handleStartDayChange = (event) => {
		console.log(event.target.value);
		this.setState((prevState) => {
			return {
				startDayValue: event.target.value
			}
		})
	}

	handleEndYearChange = (event) => {
		this.setState((prevState) => {
			return {
				endYearValue: event.target.value
			}
		})
	}

	handleEndMonthChange = (event) => {
		this.setState((prevState) => {
			return {
				endMonthValue: event.target.value
			}
		})
	}

	handleEndDayChange = (event) => {
		this.setState((prevState) => {
			return {
				endDayValue: event.target.value
			}
		})
	}

	getAllStatNumber = (event) => {
		let startDate = this.state.startYearValue + '-' + this.state.startMonthValue + '-' + this.state.startDayValue;
		let endDate = this.state.endYearValue + '-' + this.state.endMonthValue + '-' + this.state.endDayValue;
		console.log(startDate);
		console.log(endDate);
		fetch("http://localhost:9000/getAllStats/startDate/" + startDate + "/endDate/" + endDate + "/userID/" + this.state.userID)
			.then(res => res.json())
			.then(res => {
				this.setAllData(res);
			});
	}

	render() {
		return (
			<div id="stat-date-options-container">
				<Typography className="stat-date-option-sec" component="div">Select Start Date:</Typography>
				<div className="stat-date-option-sec">
					<FormControl>
						<InputLabel htmlFor="start-year">Year</InputLabel>
						<Select 
							input={<Input id="start-year"/>}
							value={this.state.startYearValue}
							onChange={this.handleStartYearChange}
						>
							{this.generateYrMenuItem()}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="start-month">Month</InputLabel>
						<Select 
							input={<Input id="start-month"/>}
							value={this.state.startMonthValue}
							onChange={this.handleStartMonthChange}
						>
							{this.generateMonthMenuItem()}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="start-day">Day</InputLabel>
						<Select 
							input={<Input id="start-day"/>}
							value={this.state.startDayValue}
							onChange={this.handleStartDayChange}
						>
							{this.generateDayMenuItem(this.state.startMonthValue, this.state.startYearValue)}
						</Select>
					</FormControl>
				</div>
				<Typography className="stat-date-option-sec" component="div">Select End Date:</Typography>
				<div className="stat-date-option-sec">
					<FormControl>
						<InputLabel htmlFor="end-year">Year</InputLabel>
						<Select 
							input={<Input id="end-year"/>}
							value={this.state.endYearValue}
							onChange={this.handleEndYearChange}
						>
							{this.generateYrMenuItem()}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="end-month">Month</InputLabel>
						<Select 
							input={<Input id="end-month"/>}
							value={this.state.endMonthValue}
							onChange={this.handleEndMonthChange}
						>
							{this.generateMonthMenuItem()}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="end-day">Day</InputLabel>
						<Select 
							input={<Input id="end-day"/>}
							value={this.state.endDayValue}
							onChange={this.handleEndDayChange}
						>
							{this.generateDayMenuItem(this.state.endMonthValue, this.state.endYearValue)}
						</Select>
					</FormControl>
				</div>
				<Button className="stat-date-option-sec" 
						id="choose-date-range-btn" 
						variant="contained"
						onClick={this.getAllStatNumber}
				>
					Choose Date Range
				</Button>
			</div>
		);
	}
}

export default DateOptions;