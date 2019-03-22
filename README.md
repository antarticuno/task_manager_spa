# TaskManagerSpa

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

DESIGN:

(These tables basically mirror those from HW06)

Tables-
 - Users
     name
     email
     password_hash

 - Tasks
     title
     description
     completed

 - Assigns
     task_id
     user_id
     time_spent

User experience:
- The only things that a user has access to without logging in are the log in and create user forms. The create
  user form is only available in the "not logged in" state as I didn't think that it was necessary for users to
  be able to create other users. Additionally, when users create a new user, they are automatically logged into 
  the application. Passwords with less than 8 characters are not allowed and will notify the user with an alert.
- Once a user logs in:
  + they can see tasks, assigns, and other users (only assigns and tasks can be edited because again, I felt that
    supporting CRUD operations on Users in a task manager application didn't fit the purpose.
  + they can create tasks by filling in the form on the right hand side of every page
  + they can create assignments by filling out the form at the bottom of the assigns page
  + they can log work on the assigns page in the corresponding form (only if they are part of the assignment)
    - the form automatically rounds the number to the nearest multiple of 15
    - the database will also never receive a unit of time that is not a multiple of 15
  + they can completed tasks that they have been assigned (the tasks page will then be updated and no completed
    tasks are displayed in either the tasks page or the dropdown on the assigns page)
  + they can log out by clicking the log out button
