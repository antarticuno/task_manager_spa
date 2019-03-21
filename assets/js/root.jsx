import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';
import TaskForm from './task_form';
import AssignList from './assign_list';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
      <Provider store={store}>
        <Root tasks={tasks} />
      </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {/*
    if (store.session == null) {
      return <div>
	<Router>
	  <div>
	    <Header />
	    <div className="row">
	      <Route path="/users/new" exact={true} render={() =>
		<NewUserForm />} />
	    </div>
	  </div>
	</Router>
      </div>;
    }*/
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row" id="content">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
	      <Route path="/assigns" exact={true} render={() =>
	        <AssignList />
	      } />
            </div>
            <div className="col-4">
              <TaskForm />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
