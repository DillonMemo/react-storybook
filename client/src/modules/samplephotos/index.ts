import { AxiosResponse } from "axios";
import { createAsyncAction, ActionType, createReducer, action } from "typesafe-actions";
import { shuffle, slice } from "lodash";

export const PHOTOS_URL =
  "https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json";

const FETCH_PENDING = "photos/FETCH_PENDING";
const FETCH_SUCCESS = "photos/FETCH_SUCCESS";
const FETCH_FAILURE = "photos/FETCH_FAILURE";

export const fetchPhotosAsync = createAsyncAction(FETCH_PENDING, FETCH_SUCCESS, FETCH_FAILURE)<
  undefined,
  AxiosResponse<any>,
  undefined
>();

export type PhotosState = {
  result: { albumId: number; id: number; title: string; url: string; thumbnailUrl: string }[];
  isLoading: boolean;
  isSuccessed: boolean;
};
export type PhotosAction = ActionType<typeof fetchPhotosAsync>;

const initialize: PhotosState = {
  result: [
    {
      albumId: 0,
      id: 0,
      title: "",
      url: "",
      thumbnailUrl: ""
    }
  ],
  isLoading: true,
  isSuccessed: false
};

const photos = createReducer<PhotosState, PhotosAction>(initialize, {
  [FETCH_PENDING]: (state, action) => ({ ...state, isLoading: true, isSuccessed: false }),
  [FETCH_SUCCESS]: (state, action) => {
    const result = slice(shuffle(action.payload.data), 0, 5);

    return { result, isLoading: false, isSuccessed: true };
  },
  [FETCH_FAILURE]: state => ({ ...state, isLoading: false, isSuccessed: false })
});

export default photos;
