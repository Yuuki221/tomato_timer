import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StartBtnOnly from './startBtnOnly.js';
import PauseAndStopBtn from './pauseAndStopBtn.js';
import RestartAndStopBtn from './restartAndStopBtn.js';
import TomatoIcon from '../components/tomatoIcon.js';

const timeRemainingStyle = {
	'padding': '30px',
	'paddingLeft': '20px'
}

const timeContentStyle = {
	'marginLeft': '155px',
	'paddingTop': '15px'
}


class Timer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentMinute: '25',
			currentHour: '00',
			startButton: true,
			restartAndStopBtn: false,
			inBreak: false,
			timerNumberSoFar: this.props.currentTimerNumber,
			curUserId: this.props.userID
		};
		this.timeSectionRef = React.createRef();
	};

	componentWillUnmount(){
		clearInterval(this.state.intervalId);
	};

	timer = () => {
		let currentMinute = Number(this.state.currentMinute),
			inBreak = this.state.inBreak,
			timerNumberSoFar = this.state.timerNumberSoFar;
		if(currentMinute-1 > 0){
			this.setState({ 
				currentMinute: '' + (currentMinute-1),
				currentHour: '00',
				startButton: false,
				inBreak: inBreak,
				timerNumberSoFar: timerNumberSoFar
			})
		}else if(currentMinute-1 <=0){
			this.handleTimerFinish()
		}
	}

	handleStartClick = (e, el) => {
		let intervalId = setInterval(this.timer, 60000),
			inBreak = this.state.inBreak,
			timerNumberSoFar = this.state.timerNumberSoFar,
			curUserId = this.state.curUserId;
		this.setState({ 
			curUserId: curUserId,
			currentMinute: inBreak? '5' : '2',
			currentHour: '00',
			intervalId: intervalId,
			startButton: false,
			inBreak: inBreak,
			timerNumberSoFar: timerNumberSoFar+1
		});	
		if(this.state.curUserId !== undefined){
			// only when user logged in that we need to update database
			this.callTimerNumberUpdate();
		}
		// this.props.updateInprogressTimerNum();
	}

	callTimerNumberUpdate = () => {
		let curDate = new Date();
		let dateStr = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate();
		console.log(dateStr);
		fetch('http://localhost:9000/addTimerNumber/curDate/' + dateStr + '/userId/' + this.state.curUserId)
			.then(res => res.json())
	}

	handlePauseClick = (e, el) => {
		clearInterval(this.state.intervalId);
		let remainingMinute = this.state.currentMinute,
			inBreak = this.state.inBreak,
			timerNumberSoFar = this.state.timerNumberSoFar;
		this.setState({
			currentMinute: remainingMinute,
			currentHour: '00',
			startButton: false,
			restartAndStopBtn: true,
			inBreak: inBreak,
			timerNumberSoFar: timerNumberSoFar
		});
	}

	handleRestartClick = (e, el) => {
		let inBreak = this.state.inBreak,
			remainingMin = this.state.currentMinute,
			timerNumberSoFar = this.state.timerNumberSoFar,
			intervalId = setInterval(this.timer, 60000);
		this.setState({
			currentMinute: remainingMin,
			currentHour: '00',
			intervalId: intervalId,
			startButton: false,
			restartAndStopBtn: false,
			inBreak: inBreak,
			timerNumberSoFar: timerNumberSoFar
		});
	}

	handleStopClick = (e, el) => {
		clearInterval(this.state.intervalId);
		let inBreak = this.state.inBreak,
			timerNumberSoFar = this.state.timerNumberSoFar;

		this.setState({
			currentMinute: inBreak? '2' : '5',
			currentHours: '00',
			startButton: true,
			inBreak: !inBreak,
			timerNumberSoFar: timerNumberSoFar
		});
	}

	handleTimerFinish = (e, el) => {
		clearInterval(this.state.intervalId);
		let timerNumberSoFar = this.state.timerNumberSoFar,
			inBreak = this.state.inBreak;
		this.setState({
			currentMinute: inBreak? '2' : '5',
			currentHours: '00',
			startButton: true,
			inBreak: !inBreak,
			timerNumberSoFar: inBreak ? timerNumberSoFar : timerNumberSoFar+1
		})
	}

	// testBackendAPI = async () => {
	// 	const response = await fetch('/express_backend');
	// 	const body = await response.json();

	// 	if( response.status !== 200 ) {
	// 		throw Error(body.message);
	// 	}
	// 	console.log('test root');
	// 	return body;
	// }



	render() {
		let buttons;
		if(this.state.startButton){
			buttons = <StartBtnOnly handler={this.handleStartClick}/>
		}else if(this.state.restartAndStopBtn){
			buttons = <RestartAndStopBtn restartHandler={this.handleRestartClick} stopHandler={this.handleStopClick}/>
		}else{
			buttons = <PauseAndStopBtn pauseHandler={this.handlePauseClick} stopHandler={this.handleStopClick}/>
		}
		return (
			<Grid className="outer-container" item xs={12}>
				<Paper className="inner-paper">
					<Grid className="container-title" item xs={12}>
						<Paper className="title-paper">
							<Typography className="main-page-subtitle" variant="subtitle1">
								Timer
							</Typography>
							{this.state.apiResponse}
						</Paper>
					</Grid>
					<Grid className="small-segment" item xs={12}>
						<Paper className="segment-paper">
							<Typography style={timeRemainingStyle} className="time-remaining" variant="subtitle2">
								Time Remaining
							</Typography>
						</Paper>
					</Grid>
					<Grid className="small-segment" item xs={12}>
						<Paper className="segment-paper">
							<div ref={this.timeSectionRef} className="time-section">
								<Typography style={timeContentStyle} variant="h3">
									{this.state.currentHour + ':' + this.state.currentMinute}
								</Typography> 
							</div>
						</Paper>
					</Grid>
					<Grid className="small-segment" item xs={12}>
						<Paper className="segment-paper">
							{buttons}
						</Paper>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}


export default Timer;
