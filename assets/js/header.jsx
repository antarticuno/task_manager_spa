import React from 'react';
import _ from 'lodash';
import api from './api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Header(props) {
  let {session} = props;
  let session_info;
  if (session == null) {
    session_info =
      <div className="form-inline my-2">
        <input type="email" placeholder="email" id="login-email" />
        <input type="password" placeholder="password" id="login-password" />
        <button className="btn btn-secondary" onClick={() =>
		api.create_session($('#login-email')[0].value, $('#login-password')[0].value)}>
			  Login</button>
      </div>;
  }
  else {
    session_info =
      <div className="my-2">
        <p>Logged in as {session.user_id}&nbsp;&nbsp;&nbsp;
	  <button className="btn btn-danger" onClick={() => api.delete_session()}>
	    Logout
          </button>
        </p>
      </div>;
  }
  return <div className="row my-2">
    <div className="col-3">
      <h1><Link to={"/"} onClick={() => api.fetch_tasks()}>Task Manager</Link></h1>
    </div>
    <div className="col-3">
      <Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link>&nbsp;&nbsp;&nbsp;
      <Link to={"/assigns"} onClick={() => api.fetch_assigns()}>Assigns</Link>
    </div>
    <div className="col-3">
      {session_info}
    </div>
  </div>;
}

function state2props(state) {
  return { session: state.session};
}

export default connect(state2props)(Header);
