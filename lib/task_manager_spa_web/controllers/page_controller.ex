defmodule TaskManagerSpaWeb.PageController do
  use TaskManagerSpaWeb, :controller

  def index(conn, _params) do
    tasks = TaskManagerSpa.Tasks.list_tasks()
    render(conn, "index.html", tasks: tasks)
  end
end
