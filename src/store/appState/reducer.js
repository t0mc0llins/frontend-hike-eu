import {
  APP_LOADING,
  APP_DONE_LOADING,
  // SET_MESSAGE,
  // CLEAR_MESSAGE,
  increment_stepper,
  show_stage_form,
  set_page,
} from "./actions";

const initialState = {
  loading: false,
  message: null,
  stepper: 4,
  stageForm: true,
  page: "home",
};

export default function appStateSliceReducer(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case increment_stepper:
      return { ...state, stepper: action.payload };

    case show_stage_form:
      return { ...state, stageForm: action.payload };

    case set_page:
      return { ...state, page: action.payload };

    // case SET_MESSAGE:
    //   return { ...state, message: action.payload };

    // case CLEAR_MESSAGE:
    //   return { ...state, message: null };

    default:
      return state;
  }
}
