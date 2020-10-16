import { combineReducers } from "redux";
import userReducer from "./user/reducers";
import tripReducer from "./trip/reducers";
import chatReducer from "./chat/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
  chat: chatReducer,
});

export default rootReducer;
