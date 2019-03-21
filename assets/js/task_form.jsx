import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';

function TaskForm(props) {
  let {dispatch, session} = props;
  if (session == null) return <div>Please log in to start tracking your tasks!</div>;
  return <div>
    <h2>Create a Task</h2>
    <p>
      Task Title: <br />
      <input className="form-control" type="text" id="new-task-title" />
    </p>
    <p>
      Task Description: <br />
      <input className="form-control" type="text" id="new-task-desc" />
    </p>
    <button className="btn btn-primary" onClick={() => 
	   api.create_task($('#new-task-title')[0].value, $('#new-task-desc')[0].value)}>Create Task
    </button>
  </div>;
}

function state2props(state) {
  return {
    session: state.session,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskForm);

