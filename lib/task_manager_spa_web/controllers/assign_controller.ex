defmodule TaskManagerSpaWeb.AssignController do
  use TaskManagerSpaWeb, :controller

  alias TaskManagerSpa.Assigns
  alias TaskManagerSpa.Assigns.Assign

  action_fallback TaskManagerSpaWeb.FallbackController

  def index(conn, _params) do
    assigns = Assigns.list_assigns()
    render(conn, "index.json", assigns: assigns)
  end

  def create(conn, %{"assign" => assign_params}) do
    with {:ok, %Assign{} = assign} <- Assigns.create_assign(assign_params) do
      assign = TaskManagerSpa.Repo.preload(assign, [:user, :task])
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.assign_path(conn, :show, assign))
      |> render("show.json", assign: assign)
    end
  end

  def show(conn, %{"id" => id}) do
    assign = Assigns.get_assign!(id)
    render(conn, "show.json", assign: assign)
  end

  def update(conn, %{"id" => id, "assign" => assign_params}) do
    assign = Assigns.get_assign!(id)

    with {:ok, %Assign{} = assign} <- Assigns.update_assign(assign, assign_params) do
      render(conn, "show.json", assign: assign)
    end
  end

  def delete(conn, %{"id" => id}) do
    assign = Assigns.get_assign!(id)

    with {:ok, %Assign{}} <- Assigns.delete_assign(assign) do
      send_resp(conn, :no_content, "")
    end
  end
end
