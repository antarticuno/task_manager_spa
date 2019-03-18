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
    assign
    |> cast(attrs, [:time_spent])
    |> validate_required([:time_spent])
  end
end
