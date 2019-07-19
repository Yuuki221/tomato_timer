import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UserMenu from './userMenu.js';

const profileBtnStyle = {
	'margin': '10px'
}

const hideStyle = {
	'display': 'none'
}

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loginBtn: this.props.loginBtnOn,
			signupBtn: this.props.signupBtnOn,
			backTimerBtn: this.props.backTimerBtnOn,
			username: this.props.username
		}
		this.handleMainContentChange = this.props.changeMainPageStatus;
		this.resetTomatoState = this.props.resetOriginState;
	}

	componentWillReceiveProps(newProps){
		this.setState((prevState) => {
			return {
				loginBtn: newProps.loginBtnOn,
				signupBtn: newProps.signupBtnOn,
				backTimerBtn: newProps.backTimerBtnOn,
				username: newProps.username
			}
		})
	}

	handleLoginClick = (e, el) => {
		this.setState({
			loginBtn: false,
			signupBtn: true,
			backTimerBtn: true
		})

		this.handleMainContentChange({
			'loginBtn': false,
			'signupBtn': true,
			'backTimerBtn': true,
			'targetPage': 'loginPage'
		});
	}

	handleSignupClick = (e, el) => {
		this.setState({
			signupBtn: false,
			loginBtn: true,
			backTimerBtn: true
		})

		this.handleMainContentChange({
			'signupBtn': false,
			'loginBtn': true,
			'backTimerBtn': true,
			'targetPage': 'signupPage'
		});
	}

	handleBackToTimer = (e, el) => {
		//console.log(this.state.username.length);
		if(this.state.username.length == 0){
			this.setState({
				signupBtn: true,
				loginBtn: true,
				backTimerBtn: false,
			});
			this.handleMainContentChange({
				'signupBtn': true, 
				'loginBtn': true,
				'backTimerBtn': false,
				'targetPage': 'timerPage'
			})
		}else if(this.state.username !== undefined){
			this.setState({
				signupBtn: false,
				loginBtn: false,
				backTimerBtn: false,
			})
			this.handleMainContentChange({
				'signupBtn': false,
				'loginBtn': false,
				'backTimerBtn': false,
				'targetPage': 'timerPage'
			})
		}
	}

	handleStatBtnClick = (e, el) => {
		this.setState((prevState) => {
			return {
				signupBtn: false,
				loginBtn: false,
				backTimerBtn: false,
				username: prevState.username
			}
		})
		this.handleMainContentChange({
			'signupBtn': false,
			'loginBtn': false,
			'backTimerBtn': true, 
			'targetPage': 'statPage'
		})
	}


	render(){
		let usermenu = '';
		if(this.state['username'] && this.state['username'].length > 0){
			usermenu = <UserMenu username={this.state['username']} 
								 changeMainContent={this.handleStatBtnClick}
								 resetAppState={this.resetTomatoState}

					   />;
		}
		return (
			<div className="app-header">
				<AppBar className="app-header" position="sticky">
					<Typography className="bar-title" variant="h6">
						Tomato Timer
					</Typography>
					<div className="profile-icon">
						<IconButton 
						  edge="end" 
						  aria-label="Account of current user"
						  aria-haspopup="true"
						  onClick = {this.loginOpen}
						>
						
						</IconButton>
					</div>
					<div className="profile-button-group">
						<Button variant="contained" 
								style={this.state['signupBtn']? profileBtnStyle : hideStyle } 
								onClick={this.handleSignupClick}>
								Sign Up
						</Button>
						<Button variant="contained" 
								style={ this.state['loginBtn']? profileBtnStyle : hideStyle } 
								onClick={this.handleLoginClick}>
								Login
						</Button>
						<Button variant="contained" 
								style={ this.state['backTimerBtn']? profileBtnStyle : hideStyle } 
								onClick={this.handleBackToTimer}>
								Back to Timer
						</Button>
					</div>
					{usermenu}
				</AppBar>
			</div>
		);
	}
}

export default Header;