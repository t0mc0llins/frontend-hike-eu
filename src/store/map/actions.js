const {
  set_map_view,
  reset_map_view,
  make_polyline,
  delete_polyline,
} = require("./types");

export function setMapView(map) {
  return {
    type: set_map_view,
    payload: map,
  };
}

export function resetMapView() {
  return {
    type: reset_map_view,
  };
}

export function makePolyline(polylineArr) {
  return {
    type: make_polyline,
    payload: polylineArr,
  };
}

export function deletePolyline() {
  return {
    type: delete_polyline,
  };
}
