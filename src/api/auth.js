import { generateRandomId } from "../helper";

export const signUpApi = (users, values) =>
  new Promise((resolve, reject) => {
    const checkIfUserIsPresent = () => {
      let isPresent = false;
      users.map((user) => {
        if (user.username === values.username && user.email === values.email)
          isPresent = true;
      });
      return isPresent;
    };
    if (checkIfUserIsPresent()) {
      return setTimeout(
        () => reject(new Error("User is already present")),
        250
      );
    }
    let newUser = {
      ...values,
      id: generateRandomId(),
    };
    setTimeout(
      () =>
        resolve({
          data: newUser,
          meta: "User signed up",
        }),
      3000
    );
  });

export const loginApi = (users, values) =>
  new Promise((resolve, reject) => {
    let isEmailPresent = false;
    let isCorrectPassword = false;
    let currentUser = {};
    users.map((user) => {
      if (user.email === values.email) {
        isEmailPresent = true;
        if (user.password === values.password) {
          isCorrectPassword = true;
        }
        currentUser = user;
      }
    });
    if (!isEmailPresent) {
      return setTimeout(
        () => reject(new Error("User is not registered")),
        3000
      );
    } else {
      if (!isCorrectPassword) {
        return setTimeout(
          () => reject(new Error("Please enter correct password")),
          3000
        );
      } else {
        setTimeout(
          () =>
            resolve({
              data: { ...values, ...currentUser },
              meta: "User logged in",
            }),
          3000
        );
      }
    }
  });
