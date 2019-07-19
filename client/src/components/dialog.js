import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/*
class DialogBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'dialogTitle': this.props.dialogTitle,
			'dialogContent': this.props.dialogContent,
			'openState': this.props.openState
		};
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps['openState'] !== prevState['openState']){
			return { 
				'dialogTitle': prevState['dialogTitle'],
				'dialogContent': prevState['dialogContent'],
				'chartData': nextProps['openState']
			};
		}else{
			return null;
		}
	}

	componentDidMount() {
		
	}

	
	handleAlertClose = () => {
		this.setState((prevState) => {
			let oldState = JSON.parse(JSON.stringify(prevState));
			oldState['openState'] = true;
			console.log(oldState);
			return oldState;
		});
	}

	render(){
		return (
			<SnackbarContent
				className={clsx(classes[variant], className)}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon className={clsx(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				}
				action={[
					<IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
						<CloseIcon className={classes.icon} />
					</IconButton>
				]}
			/>
		);
	}
}
export default DialogBox;
*/