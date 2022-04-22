import { set_country_filters } from "./types";

export function setCountryFilters(filterCountries) {
  return {
    type: set_country_filters,
    payload: filterCountries,
  };
}
