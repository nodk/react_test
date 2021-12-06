import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Map from "./Map/MapPane";
import { fromLonLat, get } from 'ol/proj';
import { Layers,TileLayer,VectorLayer } from "./Layers";

import * as olSource from "ol/source";
import { Vector as VectorSource } from 'ol/source';
import { Control, FullScreenControl } from "./Controls";

import GeoJSON from 'ol/format/GeoJSON';

function App() {
  const [count, setCount] = useState(0)

  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const geojsonObject = {} as GeoJSON

  return (
    <div>
    <Map center={fromLonLat(center)} zoom={zoom} >
      <Layers>
        <TileLayer
            source={new olSource.OSM()}
            zIndex={0}
          />
          {/* {showLayer1 && (
        <VectorLayer
            source={new VectorSource({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
         )} */}
      </Layers>
      <Control>
        <FullScreenControl />
      </Control>
    </Map>
    <div>
      <input
        type="checkbox"
        checked={showLayer1}
        onChange={event => setShowLayer1(event.target.checked)}
      /> Johnson County
    </div>
 </div>
  )
}

export default App
