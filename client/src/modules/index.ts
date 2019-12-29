import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

import counter from "./counter";

const rootReducer = combineReducers({
  counter,
  loadingBar: loadingBarReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
