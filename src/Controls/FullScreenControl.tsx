import React, { useContext, useEffect, useState } from "react";
import { FullScreen } from "ol/control";
import MapContext from "../Map/MapContext";

function FullScreenControl(){
  const map= useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.addControl(fullScreenControl);
    return function cleanup(){
        map.removeControl(fullScreenControl);
      }
    }, [map]);

  return null;
};

export default FullScreenControl;