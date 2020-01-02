import { combineReducers } from "redux";

import counter from "./counter";
import photos from "./samplephotos";
import post from "./samplepost";

const rootReducer = combineReducers({
  counter,
  photos,
  post
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
