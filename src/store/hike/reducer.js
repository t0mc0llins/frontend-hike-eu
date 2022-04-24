import { all_hikes_fetched, fetch_hike } from "./types";

const initialState = {
  mainList: [],
  selectedHike: {},
};

export default function hikeSliceReducer(state = initialState, action) {
  switch (action.type) {
    case all_hikes_fetched: {
      return {
        ...state,
        mainList: [...action.payload],
      };
    }
    case fetch_hike: {
      return {
        ...state,
        selectedHike: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}
