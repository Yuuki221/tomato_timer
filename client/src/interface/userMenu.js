import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const userIconBtn = {
	width: '48px',
	height: '48px',
	position: 'absolute',
	top: '10px',
	right: '10px'
}

// const [anchorEl, setAnchorEl] = React.useState(null);

class UserMenu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			anchorEl: {},
			openMenu: false
		}
		this.iconBtnRef = React.createRef();
		this.jumpToStatPage = this.props.changeMainContent;
		this.resetAppState = this.props.resetAppState;
	}

	handleIconClick = (event) => {
		this.setState((prevState) => {
			return {
				anchorEl: this.iconBtnRef.current,
				openMenu: true
			}
		});
	}

	handleMenuClose = (event) => {
		this.setState((prevState) => {
			return {
				anchorEl: null,
				openMenu: false
			}
		});
	}

	handleStatItemClick = () => {
		this.handleMenuClose();
		this.jumpToStatPage();
	}

	handleLogoutItemClick = () => {
		this.handleMenuClose();
		this.resetAppState();
	}

	render(){
		return (
			<div style={ userIconBtn }>
				<IconButton ref={this.iconBtnRef}
					//aria-label="Account of current user"
					//aria-controls="menu-appbar"
					//aria-haspopup="true"
					onClick={this.handleIconClick}
					//color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<div>
					<Menu
						open={Boolean(this.state['openMenu'])}
						anchorEl={this.state['anchorEl']}
						onClose={this.handleMenuClose}
					>
						<MenuItem onClick={this.handleStatItemClick}>Stat</MenuItem>
						<MenuItem onClick={this.handleLogoutItemClick}>Logout</MenuItem>
					</Menu>
				</div>
			</div>
		);
	}
}

export default UserMenu;
