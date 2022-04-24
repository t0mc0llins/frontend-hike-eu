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
