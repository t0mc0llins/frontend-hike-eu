import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
import { selectDays, selectHikeId } from "./selectors";
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

export function saveForm() {
  return async function thunk(dispatch, getState) {
    const hikeId = selectHikeId(getState());
    const days = selectDays(getState());
    for (let i = 0; i < days.length; i++) {
      let { title, description, dayOrder } = days[i];
      try {
        let res = await axios.post(`${apiUrl}/hikes/create/day`, {
          title,
          description,
          dayOrder,
          hikeId,
        });
        let dayId = res.data.id;
        for (let j = 0; j < days[i].stages.length; j++) {
          let {
            title,
            description,
            distance,
            duration,
            elevation,
            startLocation,
            endLocation,
            stageOrder,
          } = days[i].stages[j];
          try {
            await axios.post(`${apiUrl}/hikes/create/stage`, {
              title,
              description,
              distance,
              duration,
              elevation,
              startLocation,
              endLocation,
              stageOrder,
              dayId,
            });
          } catch (error) {
            console.log(error.message);
            // dispatch(setMessage("danger", true, error.message));
          }
        }

        // dispatch(setMessage("danger", true, error.message));
      } catch (error) {
        console.log(error.message);
      }
    }
  };
}
