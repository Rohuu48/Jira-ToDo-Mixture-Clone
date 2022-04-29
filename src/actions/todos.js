import {
  GET_TODOS_FAILURE,
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  SET_TODOS_FAILURE,
  SET_TODOS_START,
  SET_TODOS_SUCCESS,
  SET_TODO_CATEGORIES,
  SET_TODO_FILTERS,
} from "../actionTypes/todos";
import { getTodosApi, setTodosApi } from "../api/todos";

export const getTodos = (callback, extraData) => (dispatch) => {
  dispatch({ type: GET_TODOS_START });
  getTodosApi()
    .then(
      (data) =>
        dispatch({ type: GET_TODOS_SUCCESS, data: { data, extraData } }),
      (error) =>
        dispatch({
          type: GET_TODOS_FAILURE,
          error: error.message || "Unexpected Error!!!",
        })
    )
    .then(() => {
      if (callback && typeof callback == "function") callback();
    });
};

export const setToDo = (data, callback) => (dispatch) => {
  dispatch({ type: SET_TODOS_START });
  setTodosApi(data)
    .then(
      (data) => dispatch({ type: SET_TODOS_SUCCESS, data }),
      (error) =>
        dispatch({
          type: SET_TODOS_FAILURE,
          error: error.message || "Unexpected Error!!!",
        })
    )
    .then(() => {
      if (callback && typeof callback == "function") callback();
    });
};

export const setToDoCategories = (data) => (dispatch) => {
  dispatch({ type: SET_TODO_CATEGORIES, data });
};

export const setToDoFilters = (data) => (dispatch) => {
  dispatch({ type: SET_TODO_FILTERS, data });
};
