import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertBox from '../components/dialog.js';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const showWarningStyle = { color: 'red' }

const hideWarningStyle = { display: 'none' }

class Signup extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'username': '',
			'password': '',
			'alertStatus': false,
			'showPassword': false
		};
		this.usernameField = React.createRef();
		//this.passwrdField = React.createRef();
		this.changeMainPage = this.props.changeMainPage;
	}

	handleSignupBtnClick = () => {
		this.callSignupAPI(this.state['username'], this.state['password']);

	}

	handleNameFieldChange = (e) => {
		this.setState({
			'username': e.target.value
		});
	}

	handlePasswordFieldChange = (e) => {
		this.setState({
			'password': e.target.value
		});
	}

	callSignupAPI = (username, password) => {
		let that = this;
		fetch("http://localhost:9000/signUp/username/" + username + "/password/" + password)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if(res['message'] == 'duplicated username detected'){
					this.setState((prevState) => {
						let oldState = JSON.parse(JSON.stringify(prevState));
						oldState['alertStatus'] = true;
						oldState['username'] = '';
						oldState['password'] = '';
						return oldState;
					});
				}else{
					let newPageStatus = {
						'signupBtn': true,
						'loginBtn': false,
						'backTimerBtn': true,
						'targetPage': 'signupJumpPage'
					};
					that.changeMainPage(newPageStatus);
				}
			});
	}

	handleAlertClose = () => {
		this.setState((prevState) => {
			let oldState = JSON.parse(JSON.stringify(prevState));
			oldState['alertStatus'] = false;
			return oldState;
		});
	}

	handleClickShowPassword = () => {
		this.setState((prevState) => {
			let oldMeta = JSON.parse(JSON.stringify(prevState));
			oldMeta['showPassword'] = !oldMeta['showPassword'];
			return oldMeta;
		});
	}

	render(){
		return(
			<div className="signup-page">
				<Typography variant="subtitle1" style={ this.state['alertStatus']? showWarningStyle : hideWarningStyle } >
					The username you entered is already in use. Please try again.
				</Typography> 
				<TextField className="signup-username-field"
						   value={this.state['username']}
						   label="Username" margin="normal" 
						   onChange={this.handleNameFieldChange}
				/>
				<FormControl className="signup-password-field">
					<InputLabel htmlFor="adornment-password">Password</InputLabel>
					<Input type={'password'}
						   value={this.state['password']}
						   label="Password"
						   onChange={this.handlePasswordFieldChange}
						   endAdornment={
						   		<InputAdornment position="end">
						   			<IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
						   				{this.state['showPassword']? <Visibility /> : <VisibilityOff />}
						   			</IconButton>
						   		</InputAdornment>
						   }
					/>
				</FormControl>
				<Button id="page-signup-button" variant="contained" onClick={this.handleSignupBtnClick}> Signup </Button>
			</div>
		);
	}
}

export default Signup;