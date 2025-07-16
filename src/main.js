import './style.css'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://cdn.geolonia.com/style/geolonia/basic-v1/ja.json', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

