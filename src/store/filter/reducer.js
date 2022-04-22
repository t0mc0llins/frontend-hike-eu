import { set_country_filters } from "./types";

const initialState = {
  countries: [],
};

export default function filterSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_country_filters: {
      return {
        ...state,
        countries: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}
