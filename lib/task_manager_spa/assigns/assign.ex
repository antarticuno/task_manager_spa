defmodule TaskManagerSpa.Assigns.Assign do
  use Ecto.Schema
  import Ecto.Changeset

  schema "assigns" do
    field :time_spent, :integer
    belongs_to :user, TaskManagerSpa.Users.User
    belongs_to :task, TaskManagerSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(assign, attrs) do
    ts = Map.fetch!(attrs, "time_spent") || 0
    assign = Map.put(assign, "time_spent", ts)
    if (rem(ts, 15) == 0 && ts >= 0) do
      assign
      |> cast(attrs, [:time_spent, :user_id, :task_id])
      |> validate_required([:time_spent, :user_id, :task_id])
    else
      {:error, "Invalid unit of time."}
    end
  end
end
