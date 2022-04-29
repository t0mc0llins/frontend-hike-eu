import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appDoneLoading, appLoading } from "../appState/actions";
import { selectHikeFormat } from "../hike/selectors";
import { selectToken, selectUser } from "../user/selectors";
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
    dispatch(appLoading());
    const hikeId = selectHikeId(getState());
    const days = selectDays(getState());
    const token = selectToken(getState());
    for (let i = 0; i < days.length; i++) {
      let { title, description, dayOrder } = days[i];
      try {
        let res = await axios.post(
          `${apiUrl}/hikes/create/day`,
          {
            title,
            description,
            dayOrder,
            hikeId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
            await axios.post(
              `${apiUrl}/hikes/create/stage`,
              {
                title,
                description,
                distance,
                duration,
                elevation,
                startLocation,
                endLocation,
                stageOrder,
                dayId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(appDoneLoading());
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
    dispatch(appDoneLoading());
  };
}

export function submitHike(values, nextStep) {
  return async function thunk(dispatch, getState) {
    const { title, description, country, seasons, start, end, image } = values;
    try {
      dispatch(appLoading());
      const hikeFormat = selectHikeFormat(getState());
      const user = selectUser(getState());
      const token = selectToken(getState());
      let endLocation;
      end === "" || hikeFormat === "loop"
        ? (endLocation = start)
        : (endLocation = end);
      const response = await axios.post(
        `${apiUrl}/hikes/create`,
        {
          title,
          description,
          countryRef: country,
          seasonRefs: seasons.map(Number),
          startLocation: start,
          endLocation,
          coverImage: image,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setHikeDetails({
          hikeId: response.data.id,
          title: response.data.title,
          description: response.data.description,
        })
      );
      nextStep();
      // dispatch(showMessageWithTimeout("success", true, "auction started"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        // dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(appDoneLoading());

        // dispatch(setMessage("danger", true, error.message));
      }
    }
  };
}
