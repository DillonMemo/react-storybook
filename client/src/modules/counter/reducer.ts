import { createReducer } from "typesafe-actions";

import { CounterState, CounterAction } from "./types";
import { INCREASE, DECREASE, INCREASE_BY } from "./actions";

const initialState: CounterState = {
  count: 0
};

/**
 * Reducer
 */
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }),
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
});

export default counter;
