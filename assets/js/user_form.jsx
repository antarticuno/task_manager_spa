import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';

export default function NewUserForm(props) {
  let {dispatch} = props;
  return <div>
    <h2>Get Started!</h2>
    <p>
      Email: <br />
      <input className="form-control" type="text" id="new-user-email" />
    </p>
    <p>
      Name: <br />
      <input className="form-control" type="text" id="new-user-name" />
    </p>
    <p>
      Password: <br />
      <input className="form-control" type="password" id="new-user-password" />
    </p>
    <button className="btn btn-primary" onClick={() => validateAndSubmit(
	                   $('#new-user-name')[0].value,
		           $('#new-user-email')[0].value,
	                   $('#new-user-password')[0].value)}>Sign Up!
    </button>
  </div>;
}

function validateAndSubmit(name, email, password) {
  if (password.length < 8) {
    alert("Please submit a password with at least 8 characters.");
  }
  else {
    api.create_user(name, email, password);
  }
}

/*
// Export result of curried function call.
export default connect(state2props)(TaskList);
*/
