import { set_hike_details } from "./types";

const initialState = {
  hikeId: null,
  title: "",
  description: "",
  days: [],
  stages: [],
};

export default function formSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_hike_details: {
      return {
        ...state,
        hikeId: action.payload.hikeId,
        title: action.payload.title,
        description: action.payload.description,
      };
    }
    default: {
      return state;
    }
  }
}
