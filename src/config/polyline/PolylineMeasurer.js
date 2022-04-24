import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "./Leaflet.PolylineMeasure";

const createPolylineMeasurer = (props) => {
  return L.control.polylineMeasure({ ...props });
};

const PolylineMeasurer = createControlComponent(createPolylineMeasurer);

export default PolylineMeasurer;
