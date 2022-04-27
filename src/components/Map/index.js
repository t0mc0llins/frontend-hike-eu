import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import PolylineMeasurer from "../../config/polyline/PolylineMeasurer";
import { selectCurrentMap } from "../../store/hike/selectors";

const Map = (props) => {
  const map = useSelector(selectCurrentMap);
  const { center, minZoom, maxBoundSouthWest, maxBoundNorthEast } = map;
  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={minZoom}
      center={center}
      minZoom={minZoom}
      maxBounds={[maxBoundSouthWest, maxBoundNorthEast]}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
      <PolylineMeasurer
        position="topleft"
        clearMeasurementsOnStop={false}
        seedData={props.seedData}
        showClearControl={true}
      />
    </MapContainer>
  );
};

export default Map;
