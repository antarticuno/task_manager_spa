defmodule TaskManagerSpaWeb.PageController do
  use TaskManagerSpaWeb, :controller

  def index(conn, _params) do
    tasks = TaskManagerSpa.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :description])))
    render(conn, "index.html", tasks: tasks)
  end
end
