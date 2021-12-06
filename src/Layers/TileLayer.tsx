import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";
import Options from "ol/layer/Tile";
import TileSource from "ol/source/Tile";

function TileLayer({ source, zIndex = 0 }: {source:TileSource, zIndex: number}){
  const map = useContext(MapContext);
  console.log('TileLayersに入っている！！！！');
  console.log(map);
  console.log(zIndex);
  console.log(source);
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    // tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

export default TileLayer;
