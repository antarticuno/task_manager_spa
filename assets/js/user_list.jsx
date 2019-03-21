import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function UserList(props) {
  let {users, dispatch, session} = props;
  if (session == null) return <div>Sign up to see the other users!</div>;
  let listUsers = _.map(users, (uu) => {
      return <User key={uu.id} dispatch={dispatch}
             user={uu} />;
      }
  );
  return <div className="row">
    <table className="table table-striped">
      <thead>
        <tr>
  	  <th>Name</th>
	  <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {listUsers}
      </tbody>
    </table>
  </div>;
}

function User(props) {
  let {user, root, dispatch} = props;
  return <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
  </tr>;
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session,
  };
}

// Export result of curried function call.
export default connect(state2props)(UserList);

