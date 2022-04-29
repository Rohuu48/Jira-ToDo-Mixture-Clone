import { LOGOUT_USER } from "actionTypes/auth";
import { generateRandomId } from "helper";
import { useSelector } from "react-redux";
import {
  GET_TODOS_FAILURE,
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  SET_TODOS_START,
  SET_TODOS_SUCCESS,
  SET_TODO_CATEGORIES,
  SET_TODO_FILTERS,
} from "../actionTypes/todos";

const initialState = {
  data: {},
  loading: false,
  error: "",
  filters: {
    category: {
      "to-do": true,
      assigned: true,
      completed: true,
      "in-progress": true,
    },
    activeFilter: {
      category: "all",
      user: "all",
    },
  },
};

export const todosReducer = (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case GET_TODOS_START: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case GET_TODOS_SUCCESS: {
      const { data: allData, extraData } = data;
      let todoCategoryData = [];
      let assignedCategoryData = [];
      let inProgressCategoryData = [];
      let completedCategoryData = [];

      const pushDataToRespectiveArr = (todo) => {
        if (todo.status == "to-do") {
          todoCategoryData.push(todo);
        } else if (todo.status == "assigned") {
          assignedCategoryData.push(todo);
        } else if (todo.status == "in-progress") {
          inProgressCategoryData.push(todo);
        } else if (todo.status == "completed") {
          completedCategoryData.push(todo);
        }
      };
      Object.values(state.data || {}).map((todo) => {
        if (extraData?.operation == "filtering") {
          if (todo.assignee == extraData?.assigneeId) {
            pushDataToRespectiveArr(todo);
          }
        } else {
          pushDataToRespectiveArr(todo);
        }
      });

      return {
        ...state,
        data: state.data,
        loading: false,
        "to-do": todoCategoryData,
        assigned: assignedCategoryData,
        "in-progress": inProgressCategoryData,
        completed: completedCategoryData,
      };
    }
    case GET_TODOS_FAILURE: {
      return {
        ...state,
        loading: false,
        error,
      };
    }
    case SET_TODO_CATEGORIES: {
      let newArr = [];
      let draggedData = state.data[data.id];
      let prevCategory = data.prevCategory;
      let newCategory = data.category;
      let prevCategoryNewData = Array.isArray(state[prevCategory])
        ? state[prevCategory].filter((item) => {
            if (item.id != data.id) return item;
          })
        : [];

      let newCategoryPrevData = state[newCategory] || [];
      newCategoryPrevData.map((item) => newArr.push(item));
      newArr.push({ ...draggedData, status: newCategory });

      //update the main data obj as well
      let allData = state.data || {};
      Object.assign(allData[data.id], { status: newCategory });
      Object.assign(allData, { [data.id]: allData[data.id] });
      return {
        ...state,
        data: allData,
        [newCategory]: newArr,
        [prevCategory]: prevCategoryNewData,
      };
    }
    case SET_TODO_FILTERS: {
      let userFilterStatus = {};
      let categoryFilterStatus = {};

      if (data.filterGrp == "category") {
        if (data.category !== "all") {
          categoryFilterStatus = {
            "to-do": false,
            assigned: false,
            completed: false,
            "in-progress": false,
          };
        } else {
          categoryFilterStatus = {
            "to-do": true,
            assigned: true,
            completed: true,
            "in-progress": true,
          };
        }
      }
      let filterGrpData =
        data.filterGrp == "category"
          ? {
              category: {
                ...state?.filters?.category,
                ...categoryFilterStatus,
                [data.category]: true,
              },
            }
          : {};
      let activeFilterData =
        data.filterGrp == "category"
          ? { category: data?.category || "all" }
          : { user: data?.assigneeId };
      return {
        ...state,
        filters: {
          ...state.filters,
          ...filterGrpData,
        },
        activeFilter: {
          ...state.activeFilter,
          ...activeFilterData,
        },
      };
    }
    case SET_TODOS_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_TODOS_SUCCESS: {
      const id = generateRandomId();
      let todosData = state.data || {};
      let status = data.assignee ? "assigned" : "to-do";
      Object.assign(todosData, { [id]: { ...data, status, id } });

      let statusCategoryData = state[status] || [];

      statusCategoryData.push({ ...data, id, status });

      return {
        ...state,
        loading: false,
        data: todosData,
        [status]: statusCategoryData,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        loading: false,
        error: "",
        filters: {
          category: {
            "to-do": true,
            assigned: true,
            completed: true,
            "in-progress": true,
          },
          activeFilter: {
            category: "all",
            user: "all",
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
