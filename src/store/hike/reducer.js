import { all_hikes_fetched, fetch_hike, set_hike_format } from "./types";

const initialState = {
  mainList: [],
  selectedHike: {},
  hikeFormat: "loop",
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
    case set_hike_format: {
      return {
        ...state,
        hikeFormat: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
