import { createAction } from "typesafe-actions";

/**
 * Action Type 선언
 */
export const INCREASE = "counter/INCREASE";
export const DECREASE = "counter/DECREASE";
export const INCREASE_BY = "counter/INCREASE_BY";

/**
 * Action method 선언
 * ex)
 * const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });
 * == const createItem = createAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));
 */
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();
