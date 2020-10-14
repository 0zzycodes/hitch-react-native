import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
// import thunk from "redux-thunk";

import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [logger];
// const middleware = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer);

export const persistor = persistStore(store);

export default {
  store,
  persistor,
};
