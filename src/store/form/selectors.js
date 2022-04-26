export const selectHikeId = (reduxState) => reduxState.form.hikeId;
export const selectDays = (reduxState) => reduxState.form.days;
export const latestStages = (reduxState) =>
  reduxState.form.days[reduxState.form.days.length - 1].stages;
