import { createReducer } from "typesafe-actions";

import { CounterState, CounterAction } from "./types";
import { INCREASE, DECREASE, INCREASE_BY } from "./actions";

const initialState: CounterState = {
  count: 0
};

/**
 * Reducer
 * ex)
 * const counter = (state: counterState = initialState, action: CounterAction) => {
 *    switch (action.type) {
 *      case INCREASE:
 *        return ({count: state.count + 1})
 *      // ...
 *    }
 * }
 */
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }),
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
});

export default counter;
