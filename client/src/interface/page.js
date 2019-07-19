import React from 'react';
import 'typeface-roboto';
import '../css/reset.css';
import ReactDOM from 'react-dom';
import Header from './header.js';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Timer from '../components/timer.js';
import Todos from '../components/todos.js';
import InProgress from '../components/inprogress.js';
import Done from '../components/done.js';
import SignUp from './signup.js';
import Login from './login.js';
import StatPage from './statPage.js';
import JumpToLogin from './jumpToLogin.js';


class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'metadata': {
				'appbar': {
					'signupBtn': true,
					'loginBtn': true,
					'backTimerBtn': false
				},
				'todo': [],
				'inprogress': [],
				'complete': [],
				'maxIdx': 0,
				'currentTimerNumber': 0,
				'personalInfo': {
					'username': '',
					'password': '',
					'userID': ''
				},
				'loginPage': false,
				'signupPage': false,
				'timerPage': true,
				'statPage': false,
				'signupJumpPage': false
			}
		};
	}

	updateTodoList = (todoList, updatedIdx) => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata']));

			oldMetadata['todo'] = todoList;
			oldMetadata['maxIdx'] = updatedIdx;
			return {
				'metadata': oldMetadata
			};
		});
	}

	removeFromTodoList = (removedItem) => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata'])),
				currentTodoList = oldMetadata['todo'];

			for(let p=0; p<currentTodoList.length; p++){
				if(currentTodoList[p][0] == removedItem[0]){ 
					currentTodoList.splice(p, 1); 
				}
			}
			oldMetadata.todo = currentTodoList;
			return {
				'metadata': oldMetadata
			}
		});
	}

	updateInProgress = (inProgressList) => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata']));
			
			oldMetadata['inprogress'] = inProgressList;
			return {
				'metadata': oldMetadata
			}
		});
	}

	updateDone = (doneItem) => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata'])),
				complete = prevState['metadata']['complete'];
			
			complete.push([doneItem[0], doneItem[1], doneItem[2]]);
			oldMetadata['complete'] = complete;
			oldMetadata['inprogress'] = [];
			
			return {
				'metadata': oldMetadata
			}
		});
	}

	updateInprogressTimerNum = () => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata'])),
				currentTimerNumber = prevState['metadata']['currentTimerNumber'];
			
			oldMetadata.currentTimerNumber = currentTimerNumber + 1;
			
			return {
				'metadata': oldMetadata
			}
		});
	}

	changeMainPageContent = (newPageStatus) => {
		console.log(newPageStatus);
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata']));

			oldMetadata['appbar']['signupBtn'] = newPageStatus['signupBtn'];
			oldMetadata['appbar']['loginBtn'] = newPageStatus['loginBtn'];
			oldMetadata['appbar']['backTimerBtn'] = newPageStatus['backTimerBtn'];
			oldMetadata['loginPage'] = (newPageStatus['targetPage'] === 'loginPage');
			oldMetadata['signupPage'] = (newPageStatus['targetPage'] === 'signupPage');
			oldMetadata['timerPage'] = (newPageStatus['targetPage'] === 'timerPage');
			oldMetadata['statPage'] = (newPageStatus['targetPage'] === 'statPage');
			oldMetadata['signupJumpPage'] = (newPageStatus['targetPage'] === 'signupJumpPage');

			return {
				'metadata': oldMetadata
			}
		});
	}

	updateUserInfoAndTimerPage = (username, password, userID) => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata']));

			oldMetadata['personalInfo']['username'] = username;
			oldMetadata['personalInfo']['password'] = password;
			oldMetadata['personalInfo']['userID'] = userID;
			oldMetadata['timerPage'] = true;
			oldMetadata['signupPage'] = false;
			oldMetadata['loginPage'] = false;
			oldMetadata['appbar']['signupBtn'] = false;
			oldMetadata['appbar']['loginBtn'] = false;
			oldMetadata['appbar']['backTimerBtn'] = false;

			return {
				'metadata': oldMetadata
			}
		});
	}

	resetStateValues = () => {
		this.setState((prevState) => {
			let oldMetadata = JSON.parse(JSON.stringify(prevState['metadata']));

			oldMetadata['appbar']['signupBtn'] = true;
			oldMetadata['appbar']['loginBtn'] = false;
			oldMetadata['appbar']['backTimerBtn'] = true;
			oldMetadata['todo'] = [];
			oldMetadata['inprogress'] = [];
			oldMetadata['complete'] = [];
			oldMetadata['maxIdx'] = 0;
			oldMetadata['currentTimerNumber'] = 0;
			oldMetadata['personalInfo']['username'] = '';
			oldMetadata['personalInfo']['password'] = '';
			oldMetadata['personalInfo']['userID'] = '';
			oldMetadata['loginPage'] = true;
			oldMetadata['signupPage'] = false;
			oldMetadata['timerPage'] = false;
			oldMetadata['statPage'] = false;
			oldMetadata['signupJumpPage'] = false;

			return { 
				'metadata': oldMetadata 
			}
		});
	}

	render() {
		let mainPageContent;
		if(this.state['metadata']['loginPage']){
			mainPageContent = <Login updateUserInfo={this.updateUserInfoAndTimerPage} />;
		}else if(this.state['metadata']['signupPage']) {
			mainPageContent = <SignUp changeMainPage={this.changeMainPageContent}/>;
		}else if(this.state['metadata']['statPage']){
			mainPageContent = <StatPage username={this.state['metadata']['personalInfo']['username']}
										password={this.state['metadata']['personalInfo']['password']}
										userID={this.state['metadata']['personalInfo']['userID']} 
							  />;
		}else if(this.state['metadata']['signupJumpPage']){
			mainPageContent = <JumpToLogin updateMainPage={this.changeMainPageContent}/>;
		}if(this.state['metadata']['timerPage']) {
			mainPageContent = <React.Fragment>
									<div className="content-row row-1">
										<div className="row-block-col-1">
											<Timer updateInprogressTimerNum={this.updateInprogressTimerNum} 
												   currentTimerNumber={this.state['currentTimerNumber']}
												   userID={this.state['metadata']['personalInfo']['userID']}
											/>
										</div>
										<div></div>
										<div className="row-block-2">
											<Todos updateInProgress={this.updateInProgress}
												   removeStateUpdate={this.removeFromTodoList} 
												   updateTodoList={this.updateTodoList}
												   maxId={this.state['metadata']['maxIdx']}
												   userID={this.state['metadata']['personalInfo']['userID']}
												   todoListContent={this.state['metadata']['todo']} 
											/>
										</div>
									</div>
									<div className="content-row row-2">
										<div className="row-block-col-1">
											<InProgress progressListContent={this.state['metadata']['inprogress']} 
														updateInProgress={this.updateInProgress}
														updateFinishList={this.updateDone}
														maxId={this.state['metadata']['maxIdx']}
														userID={this.state['metadata']['personalInfo']['userID']}
														curTimerNum={this.state['metadata']['currentTimerNumber']}
											/>
										</div>
										<div></div>
										<div className="row-block-col-2">
											<Done updateDoneList={this.updateDoneList} 
											      finishListContent={this.state['metadata']['complete']} 
											      maxId={this.state['metadata']['maxId']}
											      userID={this.state['metadata']['personalInfo']['userID']}
											/>
										</div>
									</div>
							  </React.Fragment>;

		}
		console.log(this.state);
		return (
			<div>
				<Header signupBtnOn={this.state['metadata']['appbar']['signupBtn']} 
						loginBtnOn={this.state['metadata']['appbar']['loginBtn']}
						backTimerBtnOn={this.state['metadata']['appbar']['backTimerBtn']}
						changeMainPageStatus={this.changeMainPageContent}
						username={this.state['metadata']['personalInfo']['username']}
						resetOriginState={this.resetStateValues}
				/>
				{mainPageContent}
			</div>
		);
	}
}

export default Page;