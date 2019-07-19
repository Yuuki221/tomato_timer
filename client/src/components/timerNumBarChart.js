import React from 'react';
import '../css/index.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class TimerNumBarChart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chartData: this.props.timerChartData
		}
		this.barChartCanvasRef = React.createRef();
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.timerChartData !== prevState.chartData){
			return { chartData: nextProps.timerChartData };
		}else{
			return null;
		}
	}

	componentDidMount(){
		if(this.state.chartData.length > 0){
			this.loadTimerNumBarChart(this.state.chartData);
		}
	}

	loadTimerNumBarChart = (chartData) => {
		let processedChartData = this.processBarChartData(chartData);
		//let chartEl = ReactDOM.findDOMNode(this.barchartCanvasRef);
		console.log(this.barChartCanvasRef);
		let context = this.barChartCanvasRef.current.getContext('2d');
		let timerNumBarChart = new Chart(context, {
			type: 'bar',
			data: processedChartData.newData,
			options: processedChartData.options
		});
	}

	processBarChartData = (rawChartData) => {
		console.log(rawChartData);
		let pureChartData = rawChartData.map(datRow => datRow.timer_number);
		let chartLabels = rawChartData.map(datRow => datRow.record_date);
		let chartColors = Array.apply(null, Array(rawChartData.length)).map(() => 'Blue');
		let processedData = {
			labels: chartLabels,
			datasets: [{
				label: '# of Timer Number',
				data: pureChartData,
				borderWidth: 1
			}]
		};

		let options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}],
				scales: {
					xAexs: [{
						barPercentage: 0.5,
						barThickness: 6,
						maxBarThickness: 8,
						minBarLength: 2,
						gridLines: {
							offsetGridLines: true
						}
					}]
				}
			},
			color: chartColors
		};
		return {
			newData: processedData,
			options: options
		}
	}

	render(){
		return <canvas id="timerNumBarChart" width="200" height="100" ref={this.barChartCanvasRef}></canvas>;
	}
}

export default TimerNumBarChart;