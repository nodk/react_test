import React, { ReactNode, RefObject, useEffect, useRef, useState } from "react";
// OpenLayers読み込み
import * as ol from "ol";
import MapContext from "./MapContext";
import "ol/ol.css";
import "./MapPane.css";
import { string } from "fp-ts";
import { interaction } from "openlayers";

function Map({ children, zoom, center }: {children: ReactNode, zoom: number, center: number[]}){
  const [map, setMap] = useState(new ol.Map({}));
  const mapRef = useRef<HTMLDivElement>(null);

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    console.log("aaa");
    console.log(mapObject);
    mapObject.setTarget(mapRef.current as HTMLElement);
    setMap(mapObject);
    console.log(map);
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={ map }>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
