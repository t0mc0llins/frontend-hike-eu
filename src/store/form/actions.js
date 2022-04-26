import { set_hike_details } from "./types";

export function setHikeDetails(details) {
  return {
    type: set_hike_details,
    payload: details,
  };
}
