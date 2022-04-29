let todos = {};

export const getTodosApi = () =>
  new Promise((resolve, reject) => {
    if (!todos) {
      return setTimeout(() => reject(new Error("Todos not found")), 250);
    }

    setTimeout(() => resolve(todos), 1000);
  });

export const setTodosApi = (data) =>
  new Promise((resolve, reject) => {
    if (!todos) {
      return setTimeout(() => reject(new Error("Todo not created")), 250);
    }

    setTimeout(() => resolve(data), 1000);
  });
