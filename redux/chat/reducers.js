import { ActionTypes } from "./types";
const INITIAL_STATE = {
  currentChannel: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
