defmodule TaskManagerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string

    timestamps()

    has_many :assigns, TaskManagerSpa.Assigns.Assign 
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :admin])
    |> validate_required([:email, :password_hash, :admin])
  end
end
