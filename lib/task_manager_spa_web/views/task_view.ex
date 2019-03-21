defmodule TaskManagerSpaWeb.TaskView do
  use TaskManagerSpaWeb, :view
  alias TaskManagerSpaWeb.TaskView
  require Protocol

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      assigns: task.assigns}
  end

  Protocol.derive(Jason.Encoder, TaskManagerSpa.Tasks.Task, only: [:assigns])
end
