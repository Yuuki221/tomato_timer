import React from 'react';
import Button from '@material-ui/core/Button';

class RestartAndStop extends React.Component {
	render(){
		return(
			<div>
				<Button variant="contained" onClick={this.props.restartHandler}>Restart</Button>
				<Button variant="contained" onClick={this.props.stopHandler}>Stop</Button>
			</div>
		);
	}
}

export default RestartAndStop;