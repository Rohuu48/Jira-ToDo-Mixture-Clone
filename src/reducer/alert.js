import { DE_ACTIVATE_ALERT, ACTIVATE_ALERT } from 'actionTypes/alert';

const initialState = {
  alertsList: {}
};

export const alertReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case ACTIVATE_ALERT: {
      const { status, title, description, id } = data;
      return {
        ...state,
        alertsList: {
          [id]: {
            status,
            title,
            description
          },
          ...state.alertsList
        }
      };
    }

    case DE_ACTIVATE_ALERT: {
      const { id } = data;
      const newList = { ...state.alertsList };
      if (state.alertsList[id]) {
        delete newList[id];
      }
      return {
        ...state,
        alertsList: []
      };
    }
    default:
      return state;
  }
};
