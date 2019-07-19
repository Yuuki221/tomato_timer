import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const profileBtnStyle = {
	margin: '10px'
}

class JumpToLogin extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		};
		this.changeMainPage = this.props.updateMainPage;
	}

	jumpToLoginPage = () => {
		let newContentState = {
			'signupBtn': true,
			'loginBtn': false,
			'backTimerBtn': true,
			'targetPage': 'loginPage'
		};
		this.changeMainPage(newContentState);
	};

	render(){
		return (
			<div>
				<Typography className="stat-header-title" variant="h6" component="h6">
					Your signup is successful. Please click the button below to login. 
				</Typography>
				<Button variant="contained"
						style={profileBtnStyle}
						onClick={this.jumpToLoginPage}>
						Click here to login
				</Button>
			</div>
		);
	}
}

export default JumpToLogin;