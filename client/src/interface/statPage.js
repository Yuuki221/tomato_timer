import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateRange from '../components/dateOptions';
import TimerNumBarChart from '../components/timerNumBarChart';
import TaskNumBarChart from '../components/taskNumBarChart';
import SummaryStat from '../components/summaryStat.js';


class StatPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			password: this.props.password,
			userID: this.props.userID,
			timerNumberBarchartData: [],
			taskNumberBarchartData: [],
			summaryStat: {}
		};

	}

	setTimerNumberBarChartData = (newChartData) => {
		if(newChartData.length > 0){
			this.setState((prevState) => {
				let oldMetadata = JSON.parse(JSON.stringify(prevState));
				oldMetadata.timerNumberBarchartData = newChartData;
				return oldMetadata;
			});
		}
	};

	setTaskNumberBarChartData = (newChartData) => {
		if(newChartData.length > 0){
			this.setState((prevState) => {
				let oldMetadata = JSON.parse(JSON.stringify(prevState));
				oldMetadata.taskNumberBarchartData = newChartData;
				return oldMetadata;
			});
		}
	};

	setChartsData = (newChartData) => {
		// dispatch different chart data 
		console.log(newChartData);
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState));
			oldMetadata.timerNumberBarchartData = newChartData.timerNum;
			oldMetadata.taskNumberBarchartData = newChartData.taskNum;
			oldMetadata.summaryStat = {
				'timerNum': newChartData.timer_number,
				'taskNum': newChartData.timer_duration
			};
			return oldMetadata;
		});
	};

	render() {
		console.log(this.state.summaryStat['taskNum']);
		console.log(this.state.summaryStat['timerNum']);
		return (
			<React.Fragment>
				<Typography className="stat-header-title" variant="h2" component="h2">
					Stats - Tomato Timer
				</Typography>
				<Typography className="stat-header-data-range-title" variant="h5" component="h5">
					Date Range
				</Typography>
				{<DateRange username={this.state.username}
							password={this.state.password}
							userID={this.state.userID}
							updateStat={this.setChartsData} 
				/>}
				<div id="tomato-timer-counts-stats-container">
					{this.state.timerNumberBarchartData.length > 0? <TimerNumBarChart timerChartData={this.state.timerNumberBarchartData} /> : ''}
				</div>
				<div id="task-number-counts-stats-container">
					{this.state.taskNumberBarchartData.length > 0? <TaskNumBarChart taskChartData={this.state.taskNumberBarchartData} /> : ''}
				</div>
				<div id="timer-stats-summary">
					{(this.state.summaryStat['taskNum'] == undefined && this.state.summaryStat['timerNum'] == undefined)? '' : <SummaryStat summaryData={this.state.summaryStat} /> }
				</div>
			</React.Fragment>
		);
	}
}


export default StatPage;