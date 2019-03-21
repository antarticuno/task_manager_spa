import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import NewUserForm from './user_form';

function TaskList(props) {
  let {tasks, dispatch, session} = props;
  let listTasks = _.map(tasks, (tt) => {
      if (tt.completed == false) {
      return <Task key={tt.id} dispatch={dispatch}
             task={tt} session={session} />;
      }
      return null;
    }
  );
  if (session == null) {
    return <NewUserForm />;
  }
  return <div className="row">
    <h2>Tasks in Progress</h2>
    <table className="table table-striped">
      <thead>
        <tr>
  	  <th>Title</th>
	  <th>Description</th>
	  <th>Time Spent:</th>
        </tr>
      </thead>
      <tbody>
      {listTasks}
      </tbody>
    </table>
  </div>;
}

function Task(props) {
  let {task, root, dispatch, session} = props;
  function totalTimeSpent(assigns) {
    let acc = 0;
    _.map(assigns, (assign) => {
      acc += assign.time_spent;
    });
    return acc;
  }
  function completeButton(task) {
    let assigns = task.assigns;
    if (_.some(assigns, (i) => {return ("" + i.user_id) == session.user_id})) {
      return <button className="btn btn-success" onClick={() =>
	      api.update_task(task.id, task.title, task.description, true)}>Complete</button>;
    }
    return "";
  }

  return <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{totalTimeSpent(task.assigns)}&nbsp;&nbsp;&nbsp;{completeButton(task)}</td>
  </tr>;
}

function state2props(state) {
  return {
    session: state.session,
    tasks: state.tasks,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);

