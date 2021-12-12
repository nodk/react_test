import { useState, useEffect } from 'react'
import { useStableEffect, useStable } from 'fp-ts-react-stable-hooks';
import logo from './logo.svg'
import './App.css'
import Map from "./Map/MapPane";
import { fromLonLat, get } from 'ol/proj';
import { Layers,TileLayer,VectorLayer } from "./Layers";

import * as olSource from "ol/source";
import { Vector as VectorSource } from 'ol/source';
import { Control, FullScreenControl } from "./Controls";

import GeoJSON from 'ol/format/GeoJSON';
import * as J from 'fp-ts/Json'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { Eq } from 'fp-ts/lib/Eq';
import { pipe } from 'fp-ts/function'
import styles from './Styles'
import { AssertionError } from 'ol';
import * as jdt from 'json-diff-ts';


async function read_geojson() {
  const res = await fetch("data/sample.geojson");
  return res;
}

const valid_geojson={
  "type": "FeatureCollection",
  "crs": { "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
         }
        },
  "features": []
}

function App() {
  const [count, setCount] = useState(0)
  const eqjson:Eq<J.Json> = ({equals: (a, b)=>{const c = jdt.diff(a,b);/*console.log(c); */return c.length == 0;}})
  const [geoJsonObject, setGeoJsonObject] = useStable<J.Json>(valid_geojson,eqjson)
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  useEffect(() => {
    const te_result = (() => {
      return TE.tryCatch(
        () => read_geojson(),
        err => Error("file not found")
      )
    });
    const fetchGeoJson = pipe(
      te_result(),
      TE.chain((r)=>TE.tryCatch(()=>r.text(),err => Error("body not found"))),
      //TE.map((_)=>{console.log(String(_));return _;}),
      TE.chain((j)=>TE.fromEither(J.parse(j))),
      TE.map((j)=>{setGeoJsonObject(j);return "success";})
    )
    fetchGeoJson().then((_)=>{})
  },[geoJsonObject])

  return (
    <div>
    <Map center={fromLonLat(center)} zoom={zoom} >
      <Layers>
        <TileLayer
            source={new olSource.OSM()}
            zIndex={0}
          />
          {showLayer1 && (
            <VectorLayer
              source={new VectorSource({ features: new GeoJSON().readFeatures(geoJsonObject, { featureProjection: get('EPSG:3857') }) })}
              style={styles.MultiPolygon}
              zIndex={1}
            />
          )}
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
