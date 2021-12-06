import React, { createContext } from "react";
import * as ol from 'ol'
const MapContext:React.Context<ol.Map> = createContext(new ol.Map({}))
export default MapContext;