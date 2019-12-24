import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

/**
 * Ready to Type
 */
// const {increase, decrease, increaseBy} = actions;
// const ACTIONS = { increase, decrease, increaseBy };
export type CounterAction = ActionType<typeof actions>;

/**
 * 초기값 선언
 */
export type CounterState = {
  count: number;
};
