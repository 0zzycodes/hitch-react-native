import { ActionTypes } from "./types";
const INITIAL_STATE = {
  allTrip: [],
  singleTrip: null,
  foundTrip: [],
  editTrip: null,
};

const tripReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_TRIPS:
      return {
        ...state,
        allTrip: action.payload,
      };
    case ActionTypes.SET_SINGLE_TRIPS:
      return {
        ...state,
        singleTrip: action.payload,
      };

    case ActionTypes.SET_FOUND_TRIP:
      return {
        ...state,
        foundTrip: action.payload,
      };
    case ActionTypes.EDIT_TRIP:
      return {
        ...state,
        editTrip: action.payload,
      };

    default:
      return state;
  }
};

export default tripReducer;
