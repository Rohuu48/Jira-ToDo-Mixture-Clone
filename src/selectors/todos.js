import { createSelector } from "reselect";

export const getTodosFormattedData = createSelector(
  (state) => state.todos,
  (todos) => {
    let formattedTodoData = {};
    let todoCategoryData = [];
    let assignedCategoryData = [];
    let inProgressCategoryData = [];
    let completedCategoryData = [];

    Object.values(todos.data).map((todo) => {
      if (todo.status == "to-do") {
        todoCategoryData.push(todo);
      } else if (todo.status == "assigned") {
        assignedCategoryData.push(todo);
      } else if (todo.status == "in-progress") {
        inProgressCategoryData.push(todo);
      } else {
        completedCategoryData.push(todo);
      }
    });
    Object.assign(formattedTodoData, {
      "to-do": todoCategoryData,
      assigned: assignedCategoryData,
      "in-progress": inProgressCategoryData,
      completed: completedCategoryData,
    });
    return formattedTodoData || [];
  }
);

export const getAssigneeDetails = (assigneeId) =>
  createSelector(
    (state) => state.auth.allUsers,
    (users) => {
      let assignedUser = [];
      if (assigneeId) {
        users.map((user) => {
          if (user.id == assigneeId) {
            assignedUser = user;
          }
        });
      }
      return assignedUser;
    }
  );
