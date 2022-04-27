import { countries } from "../../config/countries";

export const selectAllHikes = (reduxState) => reduxState.hike.mainList;
export const selectSearchableHikes = (reduxState) =>
  reduxState.hike.mainList.map((h) => {
    return {
      value: h.title,
      country: countries.find((c) => c.value === h.countryRef).label,
    };
  });
export const selectCurrentHike = (reduxState) => reduxState.hike.selectedHike;
export const selectCurrentMap = (reduxState) =>
  reduxState.hike.selectedHike.map;
export const selectTotalDistance = (reduxState) => {
  let total = 0;
  for (let i = 0; reduxState.hike.selectedHike.days.length > i; i++) {
    for (
      let j = 0;
      reduxState.hike.selectedHike.days[i].stages.length > j;
      j++
    ) {
      total += reduxState.hike.selectedHike.days[i].stages[j].distance;
    }
  }
  return total;
};
export const selectTotalElevation = (reduxState) => {
  let total = 0;
  for (let i = 0; reduxState.hike.selectedHike.days.length > i; i++) {
    for (
      let j = 0;
      reduxState.hike.selectedHike.days[i].stages.length > j;
      j++
    ) {
      total += reduxState.hike.selectedHike.days[i].stages[j].elevation;
    }
  }
  return total;
};
