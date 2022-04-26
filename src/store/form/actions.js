import { set_hike_details, submit_day } from "./types";

export function setHikeDetails(details) {
  return {
    type: set_hike_details,
    payload: details,
  };
}

export function submitDay(day) {
  return {
    type: submit_day,
    payload: day,
  };
}
