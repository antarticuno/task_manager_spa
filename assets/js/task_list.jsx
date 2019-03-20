import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
  let {tasks, dispatch} = props;
  let listTasks = _.map(tasks, (tt) =>
    <Task key={tt.id} dispatch={dispatch}
             task={tt} />
  );
  return <div className="row">
    {listTasks}
  </div>;
}

function Task(props) {
  let {task, root, dispatch} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        {task.description} <br />
      </p>
    </div>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return {
    tasks: state.tasks,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);

