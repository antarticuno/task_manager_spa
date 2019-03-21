import store from './store';

class TheServer {

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
      error: (resp) => alert("Couldn't get the specified resource."),
    });
  }

  fetch_all(type, data) {
    this.fetch_tasks();
    this.fetch_users();
    this.fetch_assigns();
    store.dispatch({
      type: type,
      data: data
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_assigns() {
    this.fetch_path(
      "/api/v1/assigns",
      (resp) => {
        store.dispatch({
          type: 'ASSIGN_LIST',
          data: resp.data,
        });
      }
    );
  }

  send_delete(path, data, callback) {
    $.ajax(path, {
      method: "delete",
      data: JSON.stringify(data),
      success: callback,
      error: (resp) => alert("Couldn't delete.),
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
      error: (resp) => alert("Bad post request."),
    });
  }

  update_task(id, title, description, completed) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: id, task: {title, description, completed}}),
      success: (resp) => {this.fetch_tasks();},
      error: (resp) => alert("Couldn't update the specified task.")
    });
  }

  update_assign(id, user_id, task_id, time_spent) {
    $.ajax("/api/v1/assigns/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: id, assign: {id, user_id, task_id, time_spent}}),
      success: (resp) => {this.fetch_assigns();},
      error: (resp) => alert("Couldn't update the specified assignment.")
    });
  }

  create_session(email, password) {
    this.send_post(
      "/api/v1/sessions",
      {email, password},
      (resp) => {
	this.fetch_all('NEW_SESSION', resp.data);
      },
    );
  }

  delete_session() {
    this.send_delete(
      "/api/v1/sessions/",
      {},
      (resp) => {
	store.dispatch({type: "DELETE_SESSION", data: null,})
      },
    );
  }

  delete_assign(id) {
    this.send_delete(
      "/api/v1/assigns/" + id,
      {id: id},
      (resp) => {
	this.fetch_assigns();
      },
    );
  }

  create_user(name, email, password) {
    this.send_post(
      "/api/v1/users",
      {user: {email: email, name: name, password: password}},
      (resp) => {
        this.fetch_users();
	this.create_session(email, password);
      },
    );
  }

  create_task(title, desc) {
    this.send_post(
      "/api/v1/tasks",
      {task: {title: title, description: desc, completed: false}},
      (resp) => {
	this.fetch_tasks();
      },
    );
  }

  create_assign(user_id, task_id) {
    this.send_post(
      "/api/v1/assigns",
      {assign: {user_id: user_id, task_id: task_id, time_spent: 0}},
      (resp) => {
        this.fetch_assigns();
      },
    );
  }

}

export default new TheServer();

