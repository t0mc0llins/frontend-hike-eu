import {
  delete_polyline,
  make_polyline,
  reset_map_view,
  set_map_view,
} from "./types";

const initialState = {
  minZoom: null,
  center: [],
  maxBoundSouthWest: [],
  maxBoundNorthEast: [],
  polylineArr: [],
};

export default function mapSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_map_view: {
      return {
        ...state,
        minZoom: action.payload.zoom,
        center: action.payload.center,
        maxBoundSouthWest: action.payload.maxBoundSouthWest,
        maxBoundNorthEast: action.payload.maxBoundNorthEast,
      };
    }
    case reset_map_view: {
      return {
        minZoom: initialState.zoom,
        center: initialState.center,
        maxBoundSouthWest: initialState.maxBoundSouthWest,
        maxBoundNorthEast: initialState.maxBoundNorthEast,
        polylineArr: initialState.polylineArr,
      };
    }
    case make_polyline: {
      return {
        ...state,
        polylineArr: action.payload,
      };
    }
    case delete_polyline: {
      return {
        ...state,
        polylineArr: initialState.polylineArr,
      };
    }
    default: {
      return state;
    }
  }
}
