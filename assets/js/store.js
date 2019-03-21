import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    products: props.products, // List of Product
    users: [], // List of User
    cart: [], // List of CartItem 
    session: null, // { token, user_id }
    add_item_forms: new Map(), // { product_id => count }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  case 'DELETE_TASKS':
    return [];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  case 'DELETE_USERS':
    return [];
  default:
    return state;
  }
}

function assigns(state = [], action) {
  switch (action.type) {
  case 'ASSIGN_LIST':
    return action.data;
  case 'DELETE_ASSIGNS':
    return [];
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  case 'GET_SESSION':
    return window.session_token;
  case 'DELETE_SESSION':
    window.session_token = null;
    return null;
  default:
    return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, assigns, session});
  let state1 = reducer(state0, action);

  console.log(state1);
  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;


