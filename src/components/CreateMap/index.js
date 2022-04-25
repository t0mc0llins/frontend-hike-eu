import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import PolylineMeasurer from "../../config/polyline/PolylineMeasurer";
import {
  makePolyline,
  resetMapView,
  setMapView,
} from "../../store/map/actions";

const initialCenter = [50.5962, 15.249];
const initialZoom = 4;
const initialBounds = [
  [11.0043, -30.1465],
  [72.3153, 60.6445],
];

function DisplayPosition({ map }) {
  const [bounds, setMapBounds] = useState(() => map.getBounds());
  const [zoom, setMapZoom] = useState(() => map.getZoom());
  const [center, setMapCenter] = useState(() => map.getCenter());
  const dispatch = useDispatch();

  const reset = useCallback(() => {
    map.setMinZoom(initialZoom);
    map.setMaxBounds(initialBounds);
    map.setView(initialCenter, initialZoom);
    dispatch(resetMapView());
  }, [map, dispatch]);

  const setMap = useCallback(() => {
    map.setMaxBounds(bounds);
    map.setMinZoom(zoom);
    const mapPayload = {
      zoom: zoom,
      center: [
        parseFloat(center.lat.toFixed(4)),
        parseFloat(center.lng.toFixed(4)),
      ],
      bounds: [
        [
          parseFloat(bounds._southWest.lat.toFixed(4)),
          parseFloat(bounds._southWest.lng.toFixed(4)),
        ],
        [
          parseFloat(bounds._northEast.lat.toFixed(4)),
          parseFloat(bounds._northEast.lng.toFixed(4)),
        ],
      ],
    };
    dispatch(setMapView(mapPayload));
  }, [map, bounds, zoom, dispatch, center.lat, center.lng]);

  const saveRoute = useCallback(() => {
    dispatch(resetMapView());
  }, [map, dispatch]);

  const onMove = useCallback(() => {
    setMapBounds(map.getBounds());
    setMapZoom(map.getZoom());
    setMapCenter(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  let polylineArr = [];

  useEffect(() => {
    function changePolyline(e) {
      polylineArr[e.id] = e.circleCoords;
      dispatch(makePolyline(polylineArr));
    }
    map.on("polylinemeasure:change", changePolyline);
    return () => {
      map.off("polylinemeasure:change", changePolyline);
    };
  }, [map]);

  return (
    <p>
      latitude: {center.lat.toFixed(4)}, longitude: {center.lng.toFixed(4)}{" "}
      {/* bounds: {bounds._southWest.lat.toFixed(4)}{" "}
      {bounds._southWest.lng.toFixed(4)} {bounds._northEast.lat.toFixed(4)}
      {bounds._northEast.lng.toFixed(4)} zoom: {zoom}{" "} */}
      <button onClick={reset}>Reset</button>{" "}
      <button onClick={setMap}>Set map</button>
    </p>
  );
}

export default function CreateMap() {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        minZoom={initialZoom}
        scrollWheelZoom={true}
        maxBounds={initialBounds}
        ref={setMap}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PolylineMeasurer
          position="topleft"
          clearMeasurementsOnStop={false}
          showClearControl={true}
        />
      </MapContainer>
    ),
    []
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}
