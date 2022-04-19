import { all_hikes_fetched } from "./types";

const initialState = {
  mainList: [],
};

export default function artworkSliceReducer(state = initialState, action) {
  switch (action.type) {
    case all_hikes_fetched: {
      return {
        ...state,
        mainList: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}
