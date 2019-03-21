defmodule TaskManagerSpaWeb.AssignView do
  use TaskManagerSpaWeb, :view
  alias TaskManagerSpaWeb.AssignView
  require Protocol

  def render("index.json", %{assigns: assigns}) do
    %{data: render_many(assigns, AssignView, "assign.json")}
  end

  def render("show.json", %{assign: assign}) do
    %{data: render_one(assign, AssignView, "assign.json")}
  end

  def render("assign.json", %{assign: assign}) do
    %{id: assign.id,
      time_spent: assign.time_spent,
      user_id: assign.user_id,
      user_name: assign.user.name,
      task_id: assign.task_id,
      task_title: assign.task.title}
  end

  Protocol.derive(Jason.Encoder, TaskManagerSpa.Assigns.Assign, only: [:time_spent, :user_id, :task_id])
end
