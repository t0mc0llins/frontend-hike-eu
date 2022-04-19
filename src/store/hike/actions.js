import { all_hikes_fetched } from "./types";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";

function allHikesFetched(hikes) {
  return {
    type: all_hikes_fetched,
    payload: hikes,
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
