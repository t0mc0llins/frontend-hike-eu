import {
  set_country_filters,
  set_day_filters,
  set_search_filter,
  set_season_filters,
} from "./types";

export function setCountryFilters(filterCountries) {
  return {
    type: set_country_filters,
    payload: filterCountries,
  };
}

export function setSeasonFilters(filterSeasons) {
  return {
    type: set_season_filters,
    payload: filterSeasons,
  };
}

export function setDayFilters(filterDays) {
  return {
    type: set_day_filters,
    payload: filterDays,
  };
}

export function setSearchFilter(search) {
  return {
    type: set_search_filter,
    payload: search,
  };
}
