import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const hideWarningStyle = { 'display': 'none' }
const showWarningStyle = { 'color': 'red' }

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'signup': false,
			'username': '',
			'password': '',
			'errorStatus': false,
			'showPassword': false
		};
		this.loginUserNameField = React.createRef();
		this.loginPwdField = React.createRef();
		this.backToTimerPage = this.props.updateUserInfo;
	}

	switchToSignUp = () => {
		this.setState(() => {
			return { 'signup': false };
		});
	}

	handleLoginClick = () => {
		this.callLoginAPI();
	}

	callLoginAPI = () => {
		fetch("http://localhost:9000/sendUserPwd/" + this.state['username'])
			.then(res => res.json())
			.then(res => {
				if(res.password != undefined && res.password === this.state['password']){
					this.backToTimerPage(res.username, res.password, res.userId);
				}else if((res.message == undefined && res.message == 'wrong username or password') || res.password !== this.state['password']){
					// Todo: put some alert 
					// this.state['errorStatus'] = true;
					this.setState((prevState) => {
						let oldData = JSON.parse(JSON.stringify(prevState));
						oldData['errorStatus'] = true;
						return oldData;
					});
				}
			});
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

	handleClickShowPassword = () => {
		this.setState((prevState) => {
			let oldMeta = JSON.parse(JSON.stringify(prevState));
			oldMeta['showPassword'] = !oldMeta['showPassword'];
			return oldMeta;
		});
	}

	render() {
		return (
			<div className="login-form">
			    <Typography style={this.state['errorStatus']? showWarningStyle : hideWarningStyle}>
			    		The username or password you entered are wrong
			    </Typography>
				<TextField className="login-username-field" 
						   value={this.state['username']} 
						   label="Username" margin="normal" 
						   onChange={this.handleNameFieldChange}
				/>
				<FormControl className="login-password-field">
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
				<Button id="page-login-button" variant="contained" onClick={this.handleLoginClick}> Login </Button>
			</div>
		);
	}
}

export default Login;
