import { set_hike_details, submit_day, submit_stage } from "./types";

const initialState = {
  hikeId: null,
  title: "",
  description: "",
  dayCount: 1,
  days: [],
};

export default function formSliceReducer(state = initialState, action) {
  switch (action.type) {
    case set_hike_details: {
      return {
        ...state,
        hikeId: action.payload.hikeId,
        title: action.payload.title,
        description: action.payload.description,
      };
    }
    case submit_day: {
      return {
        ...state,
        dayCount: state.dayCount + 1,
        days: [
          ...state.days,
          {
            title: action.payload.dayTitle,
            description: action.payload.dayDescription,
            dayOrder: state.dayCount,
            hikeId: state.hikeId,
            stages: [],
          },
        ],
      };
    }
    case submit_stage: {
      const newStage = {
        title: action.payload.stageTitle,
        description: action.payload.stageDescription,
        distance: action.payload.distance,
        duration: action.payload.duration,
        elevation: action.payload.elevation,
        startLocation: action.payload.startLocation,
        endLocation: action.payload.endLocation,
        stageOrder: action.payload.stageOrder,
      };
      const days = state.days;
      const day = state.days[state.days.length - 1];
      const stages = state.days[state.days.length - 1].stages;
      stages.push(newStage);
      const newDay = { ...day, stages: stages };
      days.pop();
      days.push(newDay);
      return {
        ...state,
        days: days,
      };
    }
    default: {
      return state;
    }
  }
}
