import React from 'react';
import ListContent from './listContent.js';
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
import Typography from '@material-ui/core/Typography';

const todoInputStyle = {
	'marginLeft': '55px'
}

const todoButtonStyle = {
	'marginTop': '27px',
	'marginLeft': '50px'
}

class Todos extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'currentInputVal': '',
			'todoListItem': this.props.todoListContent ? this.props.todoListContent : [],
			'maxId': this.props['maxId'],
			'userID': this.props['userID']
		};
	}

	updateInProgressList = (inprogressItem) => {
		// reset the list content of todo list 
		this.props.updateInProgress(inprogressItem);
	}

	todoInputChangeHandler = (e, el) => {
		this.setState({ 'currentInputVal': e.target.value })
	}

	addTaskClickHandler = (e, el) => {
		let inputVal = this.state['currentInputVal'];
		let listArr = this.state['todoListItem'];
		let oldMaxId = this.state['maxId'];
		if(inputVal.trim().length !== 0){ listArr.push([oldMaxId, inputVal]); }
		this.setState({
			'currentInputVal': '',
			'todoListItem': listArr,
			'maxId': oldMaxId+1
		})
		this.props.updateTodoList(listArr, oldMaxId+1);
	}

	componentWillReceiveProps(newProps){
		let newIdx = newProps.maxId;
	}

	render() {
		return (
			<Grid className="outer-container" item xs={12}>
				<Paper className="inner-paper">
					<Grid className="container-title">
						<Paper className="title-paper">
							<Typography className="main-page-subtitle" variant="subtitle1">
								Todos
							</Typography>
						</Paper>
						<Grid style={todoInputStyle} className="input-container" item xs={10}>
							<TextField id="todo-task-input" label="Todo" margin="normal" onChange={this.todoInputChangeHandler}/>
							<Button style={todoButtonStyle} className="todo-task-button" variant="contained" onClick={this.addTaskClickHandler}>add task</Button>
						</Grid>
						<Grid className="todo-task-outer" item xs={10}>
							<div className="todo-task-container">
								<ListContent deleteBtn={true} 
											 moveToInProgress={true} 
											 finishBtn={false} 
											 listContent={this.state['todoListItem']}
											 updateInProgress={this.updateInProgressList}
								/>
							</div>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}

export default Todos;