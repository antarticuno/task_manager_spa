defmodule TaskManagerSpaWeb.AssignControllerTest do
  use TaskManagerSpaWeb.ConnCase

  alias TaskManagerSpa.Assigns
  alias TaskManagerSpa.Assigns.Assign

  @create_attrs %{
    time_spent: 42
  }
  @update_attrs %{
    time_spent: 43
  }
  @invalid_attrs %{time_spent: nil}

  def fixture(:assign) do
    {:ok, assign} = Assigns.create_assign(@create_attrs)
    assign
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assigns", %{conn: conn} do
      conn = get(conn, Routes.assign_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assign" do
    test "renders assign when data is valid", %{conn: conn} do
      conn = post(conn, Routes.assign_path(conn, :create), assign: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.assign_path(conn, :show, id))

      assert %{
               "id" => id,
               "time_spent" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.assign_path(conn, :create), assign: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assign" do
    setup [:create_assign]

    test "renders assign when data is valid", %{conn: conn, assign: %Assign{id: id} = assign} do
      conn = put(conn, Routes.assign_path(conn, :update, assign), assign: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.assign_path(conn, :show, id))

      assert %{
               "id" => id,
               "time_spent" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, assign: assign} do
      conn = put(conn, Routes.assign_path(conn, :update, assign), assign: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assign" do
    setup [:create_assign]

    test "deletes chosen assign", %{conn: conn, assign: assign} do
      conn = delete(conn, Routes.assign_path(conn, :delete, assign))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.assign_path(conn, :show, assign))
      end
    end
  end

  defp create_assign(_) do
    assign = fixture(:assign)
    {:ok, assign: assign}
  end
end
