import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function AssignList(props) {
  let {assigns, tasks, users, dispatch, session} = props;
  let listAssigns, addAssignForm;
  if (session != null) {
    addAssignForm = <NewAssignForm tasks={tasks} users={users} dispatch={dispatch} />;
    listAssigns = _.map(assigns, (aa) => {
      return <Assign key={aa.id} dispatch={dispatch}
             assign={aa} session={session} />;
    });
  }
  return <div className="row">
    <table className="table table-striped">
      <thead>
        <tr>
  	  <th>Assigned To:</th>
	  <th>Task</th>
	  <th>Time Spent</th>
        </tr>
      </thead>
      <tbody>
        {listAssigns}
      </tbody>
    </table>
    <div>
      {addAssignForm}
    </div>
  </div>;
}

function Assign(props) {
  let {assign, root, dispatch, session} = props;
  let editAssignOptions = <AssignOptions session={session} assign={assign} />;
  return <tr>
    <td>{assign.user_name}</td>
    <td>{assign.task_title}</td>
    <td>{assign.time_spent}</td>
    {editAssignOptions}
  </tr>;
}

function AssignOptions(props) {
  let {assign, session} = props;
  let assignOptionId = "new-assign-time-" + assign.id;
  let accessOptionId = "#" + assignOptionId;
  if (session.user_id != assign.user_id) return <td></td>;
  return <td>
    <input type="number" id={assignOptionId} placeholder="0" step="15" min="0" />
    <button className="btn btn-info" onClick={() => 
	    api.update_assign(assign.id, assign.user_id, assign.task_id, 
	    nearestFifteen($(accessOptionId)[0].value))}>Log
    </button>&nbsp;&nbsp;&nbsp;
    <button className="btn btn-danger" onClick={() => api.delete_assign(assign.id)}>Remove</button>
  </td>;
}

function nearestFifteen(num) {
  let remainder = num%15;
  if (remainder <= num/2) {
    return num - remainder;
  }
  else {
    return num + 15 - remainder;
  }
}

function NewAssignForm(props) {
  let {tasks, users, dispatch, root} = props;
  let userDropdown = _.map(users, (user) => {return <option key={user.id} value={user.id}>{user.name}</option>});
  let taskDropdown = _.map(tasks, 
	  (task) => {if (!task.completed) {
		      return <option key={task.id} value={task.id}>{task.title}</option>}});
  return <div>
    <select id="new-assign-user">{userDropdown}</select>&nbsp;&nbsp;&nbsp;
    <select id="new-assign-task">{taskDropdown}</select>&nbsp;&nbsp;&nbsp;
    <button className="btn btn-primary" onClick={() =>
	    api.create_assign($('#new-assign-user')[0].value, $('#new-assign-task')[0].value)}>
			Assign Task
    </button>
  </div>;
}

function state2props(state) {
  return {
    assigns: state.assigns,
    tasks: state.tasks,
    users: state.users,
    session: state.session,
  };
}

// Export result of curried function call.
export default connect(state2props)(AssignList);

