// import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const increment_stepper = "increment_stepper";
export const show_stage_form = "show_stage_form";
export const set_page = "set_page";
export const set_dark_mode = "set_dark_mode";
// export const SET_MESSAGE = "SET_MESSAGE";
// export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const incrementStepper = (active) => {
  return { type: increment_stepper, payload: active };
};
export const showStageForm = (bool) => {
  return { type: show_stage_form, payload: bool };
};
export const setPage = (page) => ({ type: set_page, payload: page });

export const setDarkMode = (mode) => ({
  type: set_dark_mode,
  payload: mode,
});

// export const clearMessage = () => ({ type: CLEAR_MESSAGE });

// export const setMessage = (variant, dismissable, text) => {
//   return {
//     type: SET_MESSAGE,
//     payload: {
//       variant,
//       dismissable,
//       text
//     }
//   };
// };

// export const showMessageWithTimeout = (
//   variant,
//   dismissable,
//   text,
//   timeOutMilliSeconds
// ) => {
//   return dispatch => {
//     dispatch(setMessage(variant, dismissable, text));

//     const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

//     setTimeout(() => dispatch(clearMessage()), timeout);
//   };
// };
