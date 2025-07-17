import { MapboxOverlay } from '@deck.gl/mapbox';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css'
import * as WeatherLayers from 'weatherlayers-gl';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://raw.githubusercontent.com/geolonia/basic-gsiseamlessphoto/main/style.json',
  center: [136.51, 37.88],
  zoom: 2.8,
  attributionControl: {
    customAttribution: '<a href="https://www.data.jma.go.jp/developer/gpv_sample.html" target="_blank">出典：気象庁「全球数値予報モデルGPV (GSM全球域・日本域)」を加工して作成</a>',
  }
});

map.on('load', async () => {

  map.setProjection({
    type: 'globe', // Set projection to globe
  });

  const image = await WeatherLayers.loadTextureData('./wind_data.png');

  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new WeatherLayers.ParticleLayer({
        id: 'particle',
        numParticles: 5000,
        maxAge: 10,
        speedFactor: 30,
        width: 2.0,
        opacity: 0.05,
        image: image,
        bounds: [-180, -90, 180, 90],
        imageUnscale: [-128, 127],
      }),
    ]
  });

  map.addControl(deckOverlay);
});