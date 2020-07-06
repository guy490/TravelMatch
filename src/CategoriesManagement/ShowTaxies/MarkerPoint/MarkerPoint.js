import React from "react";
import { Marker, Tooltip, Circle } from "react-leaflet";

const MarkerPoint = ({ position, onClick, toolTipTitle }) => {
  const openTooltip = (marker) => {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openTooltip();
      });
    }
  };
  return (
    <Marker onClick={onClick} position={position} ref={openTooltip}>
      <Tooltip>{toolTipTitle}</Tooltip>
      <Circle center={position} fillColor="blue" radius={500} />
    </Marker>
  );
};

export default MarkerPoint;
