import {
  set_country_filters,
  set_day_filters,
  set_season_filters,
} from "./types";

const initialState = {
  countries: [],
  seasons: ["0", "1", "2", "3"],
  days: "3",
};

export default function filterSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_country_filters: {
      return {
        ...state,
        countries: [...action.payload],
      };
    }
    case set_season_filters: {
      return {
        ...state,
        seasons: [...action.payload],
      };
    }
    case set_day_filters: {
      return {
        ...state,
        days: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
