import { slice, shuffle } from "lodash";
import { ActionType, createAction, createReducer, action } from "typesafe-actions";

const PHOTOS_URL =
  "https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json";

const FETCH = "photos/FETCH";
// const FETCHACTION = createAction(FETCH).map(name=> ({payload: {name}));
export const FETCHPHOTOS = () => ({
  type: FETCH,
  payload: fetch(PHOTOS_URL, { cache: "no-cache" }).then(res => res.json())
});

export type PhotosAction = ActionType<typeof FETCH> | ActionType<typeof FETCHPHOTOS>;
export type PhotosState = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const initialize: PhotosState[] = [
  {
    albumId: 0,
    id: 0,
    title: "",
    url: "",
    thumbnailUrl: ""
  }
];
const photosReducer = (state: PhotosState[] = initialize, action: PhotosAction) => {
  switch (action.type) {
    case `${FETCH}_FULFILLED`:
      const result = slice(shuffle(action.payload), 0, 5);
      return result;

    default:
      return state;
  }
};

export default photosReducer;
