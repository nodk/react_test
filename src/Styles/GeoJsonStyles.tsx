import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

const styles = {
    'Point': new Style({
      image: new CircleStyle({
        radius: 10,
        fill: undefined,
        stroke: new Stroke({
          color: 'magenta',
        }),
      }),
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
  };

export default styles;