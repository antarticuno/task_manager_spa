import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
  let {tasks, dispatch} = props;
  let prods = _.map(tasks, (tt) =>
    <Product key={tt.id} dispatch={dispatch}
             task={pp} />
  );
  return <div className="row">
    {prods}
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
		/*
      <p className="form-inline">
        <input className="form-control" value={count||1} type="number"
               style={{width: "8ex"}} onChange={count_changed} />
        <button className="btn btn-primary"
                onClick={() => api.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>*/
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
export default connect(state2props)(ProductList);

