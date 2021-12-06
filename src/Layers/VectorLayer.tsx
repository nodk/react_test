import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Geometry from "ol/geom/Geometry";
import Style from "ol/style/Style";

function VectorLayer({ source, style, zIndex = 0 }:{source: VectorSource<Geometry>, style: Style, zIndex: number}){
  const map = useContext(MapContext);
  //console.log(source,style,zIndex)

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayer;