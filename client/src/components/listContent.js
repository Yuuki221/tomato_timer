import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import ListItemSingle from './listItem.js'; 

class ListContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'listValues': this.props.listContent,
			'deleteBtn': this.props.deleteBtn,
			'finishBtn': this.props.finishBtn,
			'moveToInProgress': this.props.moveToInProgress,
			'userID': this.props.userID
		};
	};

	updateInProgressList = (inprogressItem) => {
		this.props.updateInProgressList(inprogressItem);
	}

	updateListContent = (itemIdx) => {
		let newListContent = this.props.listContent;
		let deletedItem;
		for(var i=0; i<newListContent.length; i++){
			if(newListContent[i][0] == itemIdx){
				newListContent.splice(i, 1);
				deletedItem = newListContent[i];
			}
		}
		this.setState({
			// remove the corresponding listItem here
			'listValues': newListContent,
			'deleteBtn': this.state['deleteBtn'],
			'finishBtn': this.state['finishBtn'],
			'moveToInProgress': this.state['moveToInProgress'] 
		})
		this.props.removeStateUpdate(deletedItem);
	};

	moveToInProgress = (listItemObj) => {
		let newInProgress = listItemObj;
		let currentList = this.state['listValues'];
		for(let k=0; k<currentList.length; k++){
			if(currentList[k][1] == newInProgress[1]){
				currentList.splice(k, 1);
			}
		}
		this.props.updateInProgress(listItemObj);
	}
	
	render(){
		let listItems = this.state['listValues'].map((val) =>  
			<ListItemSingle key={val[0]} 
							updateFunction={this.updateListContent}
							userID={this.state.userID}
							keyItem={val[0]} 
							itemText={val[1]} 
							deleteBtn={this.state.deleteBtn} 
							finishBtn={this.state.finishBtn} 
							moveToInProgress={this.state.moveToInProgress}
							moveToInProgressFunction={this.moveToInProgress} />
		);
		return (
			<List>
				{listItems}
			</List>
		);
	};
}

export default ListContent;