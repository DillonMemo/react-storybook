import { slice, shuffle } from "lodash";
import { ActionType, createAction, createReducer, action } from "typesafe-actions";

export const PHOTOS_URL =
  "https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json";

const FETCH = "photos/FETCH";
// const FETCHACTION = createAction(FETCH).map(name=> ({payload: {name}));
// export const FETCHPHOTOS = () => ({
//   type: FETCH,
//   payload: fetch(PHOTOS_URL, { cache: "no-cache" }).then(res => res.json())
// });
export const FETCHPHOTOS = createAction(FETCH)<Promise<any>>();

export type PhotosAction = ActionType<typeof FETCH> | ActionType<typeof FETCHPHOTOS>;
export type State = {
  result: { albumId: number; id: number; title: string; url: string; thumbnailUrl: string }[];
};

export type PhotosState = State & { isLoading: boolean; isSuccessed: boolean };

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

const photosReducer = (state: PhotosState = initialize, action: PhotosAction) => {
  switch (action.type) {
    case `${FETCH}_PENDING`:
      return { ...state, isLoading: true, isSuccessed: false };
    case `${FETCH}_FULFILLED`:
      const result = slice(shuffle(action.payload), 0, 5);
      return { result, isLoading: false, isSuccessed: true };
    case `${FETCH}_REJECTED`:
      return { ...state, isLoading: false, isSuccessed: false };
    default:
      return state;
  }
};

export default photosReducer;
