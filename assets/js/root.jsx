import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import Header from './header';
//import UserList from './user_list';
import TaskList from './task_list';
//import Cart from './cart';

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

    api.create_session("example1@example.com", "password");
    api.fetch_tasks();
    //api.fetch_users();
    //api.fetch_cart();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <p>User list here</p>
              } />
            </div>
            <div className="col-4">
              <p>Put the create task logic here</p>
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
