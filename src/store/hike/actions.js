import { all_hikes_fetched, fetch_hike, set_hike_format } from "./types";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
import { setHikeDetails } from "../form/actions";
import { selectHikeFormat } from "./selectors";
import { selectToken, selectUser } from "../user/selectors";

function allHikesFetched(hikes) {
  return {
    type: all_hikes_fetched,
    payload: hikes,
  };
}

function fetchHike(hike) {
  return {
    type: fetch_hike,
    payload: hike,
  };
}

export function setHikeFormatAction(format) {
  return {
    type: set_hike_format,
    payload: format,
  };
}

export async function fetchAllHikes(dispatch, getState) {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/hikes`);
    const hikes = response.data;
    dispatch(allHikesFetched(hikes));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    // dispatch(setMessage("danger", true, error.message));
  }
  dispatch(appDoneLoading());
}

export function fetchHikeById(id) {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/hikes/${id}`);
      const hike = response.data;
      dispatch(fetchHike(hike));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
      // dispatch(setMessage("danger", true, error.message));
    }
    dispatch(appDoneLoading());
  };
}
