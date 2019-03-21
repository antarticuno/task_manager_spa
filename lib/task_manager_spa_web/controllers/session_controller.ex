defmodule TaskManagerSpaWeb.SessionController do
  use TaskManagerSpaWeb, :controller

  action_fallback TaskManagerSpaWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password}) do
    with %TaskManagerSpa.Users.User{} = user <- TaskManagerSpa.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskManagerSpaWeb.Endpoint, "user_id", user.id),
          user_id: user.id
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> put_session(:user_id, resp)
      |> send_resp(:created, Jason.encode!(resp))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> send_resp(:deleted, Jason.encode!(%{data: "Logged out."}))
  end
end
