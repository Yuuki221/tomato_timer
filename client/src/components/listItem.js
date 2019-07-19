import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';

class ListItemSingle extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'key': this.props.keyItem,
			'itemText': this.props.itemText,
			'deleteBtn': this.props.deleteBtn,
			'finishBtn': this.props.finishBtn,
			'moveToInProgress': this.props.moveToInProgress,
			'userID': this.props.userID == undefined ? '' : this.props.userID
		}
	}

	deleteTask = (e, el) => {
		this.props.updateFunction(this.props.keyItem);
	}

	moveToFinish = (e, el) => {
		let itemKey = this.state.key,
			itemText = this.state.itemText;
		// update task number if the user is logged in 
		this.callUpdateTaskNumber();
		this.props.moveToFinishFunction([itemKey, itemText]);
	}

	callUpdateTaskNumber = () => {
		let curDate = new Date();
		let curDateStr = curDate.getFullYear()+'-'+(curDate.getMonth()+1)+'-'+curDate.getDate();
		console.log(curDateStr);
		if(this.state['userID']){
			fetch("http://localhost:9000/addTimeDuration/curDate/" + curDateStr + "/userID/" + this.state['userID'])
				.then(res => res.json());
		}
	}

	moveToInProgress = (e, el) => {
		let itemKey = this.state.key,
			itemText = this.state.itemText;
		this.props.moveToInProgressFunction([itemKey, itemText]);
	}

	render(){
		return (
			<ListItem>
				<ListItemText primary={this.state.itemText}/>
				<ListItemSecondaryAction>
					{this.state.deleteBtn? <Button onClick={this.deleteTask}>Delete</Button> : ''}
					{this.state.finishBtn? <Button onClick={this.moveToFinish}>Finish</Button> : ''}
					{this.state.moveToInProgress? <Button onClick={this.moveToInProgress}>To In progress</Button> : ''}
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
}

export default ListItemSingle;