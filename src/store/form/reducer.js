import { set_hike_details, submit_day } from "./types";

const initialState = {
  hikeId: null,
  title: "",
  description: "",
  dayCount: 1,
  days: [],
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
    case submit_day: {
      return {
        ...state,
        dayCount: state.dayCount + 1,
        days: [
          ...state.days,
          {
            title: action.payload.dayTitle,
            description: action.payload.dayDescription,
            dayOrder: state.dayCount,
            hikeId: state.hikeId,
            stages: [],
          },
        ],
      };
    }
    default: {
      return state;
    }
  }
}
