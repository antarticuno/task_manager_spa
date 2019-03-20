defmodule TaskManagerSpa.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      TaskManagerSpa.Repo,
      # Start the endpoint when the application starts
      TaskManagerSpaWeb.Endpoint
      # Starts a worker by calling: TaskManagerSpa.Worker.start_link(arg)
      # {TaskManagerSpa.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TaskManagerSpa.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    TaskManagerSpaWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
