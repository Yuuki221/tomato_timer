import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItemSingle from './listItem.js';
import Typography from '@material-ui/core/Typography';


class InProgress extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'inprogressItem': this.props.progressListContent? this.props.progressListContent : [],
			'timerNumber': this.props.curTimerNum,
			'userID': this.props.userID	
		};
	}

	componentWillReceiveProps(updatedProps){
		this.setState({
			'inprogressItem': updatedProps.progressListContent,
			'timerNumber': updatedProps.curTimerNum
		});
	}

	updateToFinishFunction = () => {
		var curInprogressItem = [this.state['inprogressItem'][0], this.state['inprogressItem'][1], this.state['timerNumber']];
		this.setState({
			'inprogressItem' : [],
			'timerNumber' : 0
		})

		this.props.updateFinishList(curInprogressItem);
	}

	render() {
		return (
			<Grid className="outer-container" item xs={12}>
				<Paper className="inner-paper">
					<Grid className="container-title">
						<Paper className="title-paper">
							<Typography className="main-page-subtitle" variant="subtitle1">
								Inprogress
							</Typography>
						</Paper>
						<Grid className="inprogress-task-outer" item xs={10}>
							<div className="inprogress-task-container">
								<List>
								{this.state['inprogressItem'].length > 0? <ListItemSingle key={this.state['inprogressItem'][0]} 
																						  itemText={this.state['inprogressItem'][1]} 
																						  finishBtn={true}
																						  userID={this.state['userID']} 
																						  moveToFinishFunction={this.updateToFinishFunction}/> : ''} 
								</List>
							</div>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}

export default InProgress;