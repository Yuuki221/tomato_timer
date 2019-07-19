import React from 'react';
import Button from '@material-ui/core/Button';

const stopButtonStyle = {
	'marginLeft': '55px',
	'marginTop': '25px'
}
const pauseButtonStyle = {
	'marginLeft': '120px',
	'marginTop': '25px'
}
const pauseAndStopStyle = {
	'marginTop': '55px'
}

class PauseAndStopBtn extends React.Component {
	render(){
		return(
			<div>
				<Button style={pauseButtonStyle} variant="contained" onClick={this.props.pauseHandler}>Pause</Button>
				<Button style={stopButtonStyle} variant="contained" onClick={this.props.stopHandler}>Stop</Button>
			</div>
		);
	}
}

export default PauseAndStopBtn;