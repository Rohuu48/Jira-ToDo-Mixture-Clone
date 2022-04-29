import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from "actionTypes/auth";
import { loginApi, signUpApi } from "api/auth";
import { LOGOUT_USER } from "actionTypes/auth";

export const signUpUser = (users, values, callback) => (dispatch) => {
  dispatch({ type: SIGNUP_START });
  let flagData, flagStatus;
  signUpApi(users, values)
    .then(
      (data) => {
        flagData = data.meta;
        flagStatus = "success";
        return dispatch({ type: SIGNUP_SUCCESS, data: data.data });
      },
      (error) => {
        flagData = error.message;
        flagStatus = "failure";
        dispatch({
          type: SIGNUP_FAILURE,
          error: error.message || "Unexpected Error!!!",
        });
      }
    )
    .then(() => {
      callback(flagData, flagStatus);
    });
};

export const loginUser = (users, values, callback) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  let flagData, flagStatus;
  loginApi(users, values)
    .then(
      (data) => {
        flagData = data.meta;
        flagStatus = "success";
        return dispatch({ type: LOGIN_SUCCESS, data });
      },
      (error) => {
        flagData = error.message;
        flagStatus = "failure";
        dispatch({
          type: LOGIN_FAILURE,
          error: error.message || "Unexpected Error!!!",
        });
      }
    )
    .then(() => {
      callback(flagData, flagStatus);
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
