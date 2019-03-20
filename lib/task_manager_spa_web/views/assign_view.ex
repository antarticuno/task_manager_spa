defmodule TaskManagerSpaWeb.AssignView do
  use TaskManagerSpaWeb, :view
  alias TaskManagerSpaWeb.AssignView

  def render("index.json", %{assigns: assigns}) do
    %{data: render_many(assigns, AssignView, "assign.json")}
  end

  def render("show.json", %{assign: assign}) do
    %{data: render_one(assign, AssignView, "assign.json")}
  end

  def render("assign.json", %{assign: assign}) do
    %{id: assign.id,
      time_spent: assign.time_spent}
  end
end
