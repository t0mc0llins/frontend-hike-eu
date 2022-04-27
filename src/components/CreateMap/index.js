import { Button, Group } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import PolylineMeasurer from "../../config/polyline/PolylineMeasurer";
import { selectHikeId } from "../../store/form/selectors";
import {
  deletePolyline,
  makePolyline,
  resetMapView,
  saveMap,
  setMapView,
} from "../../store/map/actions";
import { selectMap } from "../../store/map/selectors";

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
  const hikeId = useSelector(selectHikeId);
  const myMap = useSelector(selectMap);

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
      maxBoundSouthWest: [
        parseFloat(bounds._southWest.lat.toFixed(4)),
        parseFloat(bounds._southWest.lng.toFixed(4)),
      ],
      maxBoundNorthEast: [
        parseFloat(bounds._northEast.lat.toFixed(4)),
        parseFloat(bounds._northEast.lng.toFixed(4)),
      ],
    };
    dispatch(setMapView(mapPayload));
  }, [map, bounds, zoom, dispatch, center.lat, center.lng]);

  const saveRoute = useCallback(() => {
    dispatch(saveMap(hikeId));
    dispatch(resetMapView());
    dispatch(deletePolyline());
  }, [dispatch, hikeId]);

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

  useEffect(() => {
    function clearPolyline() {
      dispatch(deletePolyline());
    }
    map.on("polylinemeasure:clear", clearPolyline);
    return () => {
      map.off("polylinemeasure:clear", clearPolyline);
    };
  }, [map]);

  return (
    <Group pt={10} pb={10}>
      Latitude: {center.lat.toFixed(4)}, Longitude: {center.lng.toFixed(4)}{" "}
      <Button size="xs" onClick={reset}>
        Reset
      </Button>{" "}
      <Button size="xs" onClick={setMap}>
        Set map
      </Button>
      <Button size="xs" onClick={saveRoute} disabled={!myMap.minZoom}>
        Save map
      </Button>
    </Group>
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
        style={{ height: 800, width: "100%" }}
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
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}
