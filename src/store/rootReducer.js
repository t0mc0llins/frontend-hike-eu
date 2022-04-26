import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import hike from "./hike/reducer";
import filter from "./filter/reducer";
import map from "./map/reducer";
import form from "./form/reducer";

export default combineReducers({
  appState,
  user,
  hike,
  filter,
  map,
  form,
});
