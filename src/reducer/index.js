import { combineReducers } from "redux";
import { alertReducer } from "./alert";
import { authReducer } from "./auth";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  alert: alertReducer,
});
