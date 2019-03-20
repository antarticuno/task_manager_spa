defmodule TaskManagerSpa.Repo do
  use Ecto.Repo,
    otp_app: :task_manager_spa,
    adapter: Ecto.Adapters.Postgres
end
