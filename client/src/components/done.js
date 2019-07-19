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

class Done extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'finishedItems': this.props.doneListContent? this.props.doneListContent : [],
			'userID': this.props.userID
		};
	};

	componentWillReceiveProps(newFinishedItem){
		if(newFinishedItem.finishListContent.length > 0){
			let currentFinishList = newFinishedItem.finishListContent;
			this.setState({
				'finishedItems': currentFinishList
			});
		}
	};

	render() {
		let finishedList = this.state['finishedItems'].map((val) =>
			<ListItemSingle key = {val[0]}
							userID = {this.state['userID']}
							itemText = {val[1] + ' takes ' + val[2] + 'timers'}
			/>
		);
		return (
			<Grid className="outer-container" item xs={12}>
				<Paper className="inner-paper">
					<Grid className="container-title">
						<Paper className="title-paper">
							<Typography className="main-page-subtitle" variant="subtitle1">
								Done
							</Typography>
						</Paper>
						<Grid className="done-task-outer">
							<div className="done-task-container">
								<List>
									{finishedList}
								</List>
							</div>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}

export default Done;