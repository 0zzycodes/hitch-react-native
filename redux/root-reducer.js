import { combineReducers } from "redux";
import userReducer from "./user/reducers";
import tripReducer from "./trip/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
});

export default rootReducer;
