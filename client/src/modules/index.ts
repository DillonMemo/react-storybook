import { combineReducers } from "redux";

import counter from "./counter";
import photos from "./samplephotos";

const rootReducer = combineReducers({
  counter,
  photos
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
