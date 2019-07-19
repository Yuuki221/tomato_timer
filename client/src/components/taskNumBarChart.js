import React from 'react';
import '../css/index.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

class TaskNumBarChart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chartData: this.props.taskChartData
		};
		this.barChartCanvasRef = React.createRef();
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.taskChartData !== prevState.chartData){
			return { chartData: nextProps.taskChartData };
		}else{
			return null;
		}
	}

	componentDidMount() {
		if(this.state.chartData.length > 0){
			this.loadTaskNumberBarChart(this.state.chartData);
		}
	}

	loadTaskNumberBarChart = (chartData) => {
		let processedChartData = this.processBarChartData(chartData);
		let context = this.barChartCanvasRef.current.getContext('2d');
		let taskNumBarChart = new Chart(context, {
			type: 'bar',
			data: processedChartData.newData,
			options: processedChartData.options
		});

	}

	processBarChartData = (rawChartData) => {
		let pureChartData = rawChartData.map(datRow => datRow.duration_time);
		let chartLabels = rawChartData.map(datRow => datRow.record_date);
		let chartColors = Array.apply(null, Array(rawChartData.length)).map(() => 'Blue');

		let processedData = {
			labels: chartLabels,
			datasets: [{
				label: '# of Task Number',
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
		return <canvas id="taskNumBarChart" width="200" height="100" ref={this.barChartCanvasRef}></canvas>;
	}
}

export default TaskNumBarChart;