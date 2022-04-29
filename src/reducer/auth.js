import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  LOGOUT_USER,
} from "actionTypes/auth";

const initialState = {
  allUsers: [],
  loading: false,
  error: "",
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case SIGNUP_START: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case SIGNUP_SUCCESS: {
      let newUsers = state.allUsers;
      newUsers.push(data);
      return {
        ...state,
        allUsers: newUsers,
        loading: false,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        loading: false,
        error,
      };
    }
    case LOGIN_START: {
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
        error: "",
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: "",
        data,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error,
        role: "",
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLoggedIn: false,
        role: "",
        data: {},
      };
    }
    default: {
      return state;
    }
  }
};
