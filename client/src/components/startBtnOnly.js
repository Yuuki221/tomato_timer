import React from 'react';
import Button from '@material-ui/core/Button';

const startButtonStyle = {
	'marginTop' : '25px',
	'marginLeft' : '175px'
}

class StartBtnOnly extends React.Component {
	render(){
		return(
			<Button style={startButtonStyle} variant="contained" onClick={this.props.handler}>Start</Button>
		);
	}
}

export default StartBtnOnly;