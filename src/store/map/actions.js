import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
import { selectMap } from "./selectors";

const {
  set_map_view,
  reset_map_view,
  make_polyline,
  delete_polyline,
  submitted_map,
} = require("./types");

export function setMapView(map) {
  return {
    type: set_map_view,
    payload: map,
  };
}

export function resetMapView() {
  return {
    type: reset_map_view,
  };
}

export function makePolyline(polylineArr) {
  return {
    type: make_polyline,
    payload: polylineArr,
  };
}

export function deletePolyline() {
  return {
    type: delete_polyline,
  };
}

function submittedMap() {
  return {
    type: submitted_map,
  };
}

export function saveMap(hikeId) {
  return async function thunk(dispatch, getState) {
    const map = selectMap(getState());
    const {
      minZoom,
      maxBoundSouthWest,
      maxBoundNorthEast,
      center,
      polylineArr,
    } = map;
    dispatch(appLoading());
    try {
      await axios.post(`${apiUrl}/hikes/create/map`, {
        minZoom,
        maxBoundSouthWest,
        maxBoundNorthEast,
        center,
        polylineArr,
        hikeId,
      });
      dispatch(submittedMap());
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
      // dispatch(setMessage("danger", true, error.message));
    }
    dispatch(appDoneLoading());
  };
}
