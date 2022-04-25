import { make_polyline, reset_map_view, set_map_view } from "./types";

const initialState = {
  zoom: null,
  center: [],
  bounds: [],
  polylineArr: [],
};

export default function mapSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_map_view: {
      return {
        ...state,
        zoom: action.payload.zoom,
        center: action.payload.center,
        bounds: action.payload.bounds,
      };
    }
    case reset_map_view: {
      return {
        zoom: initialState.zoom,
        center: initialState.center,
        bounds: initialState.bounds,
        polylineArr: initialState.polylineArr,
      };
    }
    case make_polyline: {
      return {
        ...state,
        polylineArr: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
