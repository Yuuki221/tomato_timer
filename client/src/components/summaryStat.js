import React from 'react';
import '../css/index.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class SummaryStat extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			taskNum: this.props.summaryData['taskNum'],
			timerNum: this.props.summaryData['timerNum']
		};
	}

	render(){
		return (
					<div className="stat-summary-table">
					  <div className="stat-summary-row1">
					  	<Typography className="stat-row1-cell1" variant="h6" component="h6">Stat</Typography>
					  	<Typography className="stat-row1-cell2" variant="h6" component="h6">#</Typography>
					  </div>
					  <div className="stat-summary-row2">
					  	<Typography className="stat-row2-cell1" variant="h6" component="h6">Tomatoes</Typography>
					  	<Typography className="stat-row2-cell2" variant="h6" component="h6">{this.state.timerNum}</Typography>
					  </div>
					  <div className="stat-summary-row3">
					  	<Typography className="stat-row3-cell1" variant="h6" component="h6">Tasks</Typography>
					  	<Typography className="stat-row3-cell2" variant="h6" component="h6">{this.state.taskNum}</Typography>
					  </div>
			   		</div>
			   	);
	}
}

export default SummaryStat;