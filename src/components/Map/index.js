import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PolylineMeasurer from "../../config/polyline/PolylineMeasurer";
import { polylines } from "./data";

const Map = () => {
  return (
    <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={7}
      center={[20.27, -157]}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
      <PolylineMeasurer
        position="topleft"
        clearMeasurementsOnStop={false}
        seedData={polylines}
        showClearControl={true}
      />
    </MapContainer>
  );
};

export default Map;
