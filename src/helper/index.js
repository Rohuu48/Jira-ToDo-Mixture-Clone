export * from "./math";
export * from "./dimensions";

export const debounce = (callback, timeout = 500) => {
  let id = null;
  return (...args) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      typeof callback === "function" && callback(...args);
    }, timeout);
  };
};
