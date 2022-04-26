export const selectHikeId = (reduxState) => reduxState.form.hikeId;
export const selectDays = (reduxState) => reduxState.form.days;
export const latestStages = (reduxState) =>
  reduxState.form.days[reduxState.form.days.length - 1].stages;
export const selectSubmitable = (reduxState) => {
  let submitable;
  if (
    !reduxState.form.days ||
    reduxState.form.days.length === 0 ||
    reduxState.form.days[reduxState.form.days.length - 1].stages.length === 0
  ) {
    submitable = true;
  } else {
    submitable = false;
  }
  return submitable;
};
