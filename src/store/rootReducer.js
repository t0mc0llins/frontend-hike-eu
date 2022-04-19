import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import hike from "./hike/reducer";

export default combineReducers({
  appState,
  user,
  hike,
});
