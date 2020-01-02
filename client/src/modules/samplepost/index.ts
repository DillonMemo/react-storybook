import { AxiosResponse } from "axios";
import { createAsyncAction, ActionType, createReducer, action } from "typesafe-actions";

const GET_POST_PENDING = "GET_POST_PENDING";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_FAILURE = "GET_POST_FAILURE";

export const getPostAsync = createAsyncAction(GET_POST_PENDING, GET_POST_SUCCESS, GET_POST_FAILURE)<
  undefined,
  AxiosResponse<any>,
  undefined
>();

export type PostState = { pending: boolean; error: boolean; data: { title: string; body: string } };
export type PostAction = ActionType<typeof getPostAsync>;

const initialState: PostState = {
  pending: false,
  error: false,
  data: {
    title: "",
    body: ""
  }
};

const post = createReducer<PostState, PostAction>(initialState, {
  [GET_POST_PENDING]: (state, action) => ({ ...state, pending: true, error: false }),
  [GET_POST_SUCCESS]: (state, action) => {
    const { title, body } = action.payload.data;
    return { ...state, pending: false, data: { title, body } };
  },
  [GET_POST_FAILURE]: (state, action) => ({ ...state, pending: false, error: true })
});

export default post;
