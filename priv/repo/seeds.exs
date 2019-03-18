# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskManagerSpa.Repo.insert!(%TaskManagerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskManagerSpa.Repo
alias TaskManagerSpa.Users.User
alias TaskManagerSpa.Tasks.Task
alias TaskManagerSpa.Assigns.Assign

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "example1@example.com", name: "Antartikun", password_hash: pwhash})
Repo.insert!(%User{email: "example2@example.com", name: "Brenda", password_hash: pwhash})
Repo.insert!(%Task{title: "HW06", description: "Create a task manager web application",
                   completed: false})
Repo.insert!(%Task{title: "HW05", description: "Finish the memory game", completed: true})
Repo.insert!(%Assign{user_id: 1, task_id: 1, time_spent: 15})

