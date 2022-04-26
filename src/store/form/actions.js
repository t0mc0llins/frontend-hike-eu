import { set_hike_details, submit_day, submit_stage } from "./types";

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

export function submitStage(stage) {
  return {
    type: submit_stage,
    payload: stage,
  };
}
