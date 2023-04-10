<template>
  <div>
    <button v-for="layer in layers" :key="layer.id" @click="toggleLayer(layer.id)" style="position: absolute; top: 20px; right: 20px; z-index: 9999;">
      Toggle {{ layer.name }}
    </button>

    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as d3 from 'd3';

export default {
  name: 'MapboxMap',
  data() {
    return {
      map: null,
      layers: [
        {
          id: 'states',
          name: 'County Data',
          geoJsonUrl: '/geoJSON/County_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
          csvUrl: '/data-csvs/County_data.csv',
          fillColor: 'rgba(200, 100, 240, 0.22)',
          lineColor: 'rgba(200, 100, 240, 1)',
          lineWidth: 2,
          visible: true
        },
        {
          id: 'municipalities',
          name: 'Municipality Data',
          geoJsonUrl: '/geoJSON/Municipal_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
          csvUrl: null,
          fillColor: 'rgba(200, 100, 240, 0.22)',
          lineColor: 'rgba(200, 100, 240, 1)',
          lineWidth: 2,
          visible: false
        }
      ],
      csvDataLookup: {}
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2F2YW5hYmVuIiwiYSI6ImNsZTNobWs4YjA0eGkzcG1wZzhycjZrb3cifQ.4_Du3FBo2v9tdy2DZRhb6A';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.7057, 40.1583],
        zoom: 7
      });

      this.map = map;

      for (const layer of this.layers) {
        if (layer.csvUrl) {
          const lookup = await this.fetchCsvData(layer.csvUrl);
          this.csvDataLookup[layer.id] = lookup;
        }
      }

      map.on('load', async () => {
        for (const layer of this.layers) {
          this.loadLayer(map, layer);
        }
      });
    },

    async loadLayer(map, layerConfig) {
      map.addSource(layerConfig.id, {
        'type': 'geojson',
        'data': layerConfig.geoJsonUrl
      });

      map.addLayer({
        'id': `${layerConfig.id}-layer`,
        'type': 'fill',
        'source': layerConfig.id,
        'paint': {
          'fill-color': layerConfig.fillColor,
        },
        'layout': {
          'visibility': layerConfig.visible ? 'visible' : 'none'
        }
      });

      map.addLayer({
        'id': `${layerConfig.id}-outline`,
        'type': 'line',
        'source': layerConfig.id,
        'paint': {
          'line-color': layerConfig.lineColor,
          'line-width': layerConfig.lineWidth
        },
        'layout': {
          'visibility': layerConfig.visible ? 'visible' : 'none'
        }
      });

      this.addMapInteractions(map, layerConfig.id);
    },

    async fetchCsvData(csvUrl) {
      const response = await d3.csv(csvUrl);
      const lookup = {};
      response.forEach(row => {
        lookup[row.COUNTY] = {
          column2: row.column2,
          column3: row.column3
        };
      });
      return lookup;
    },





    getPopupContent(layerId, properties) {
  if (layerId === 'states') {
    const countyLabel = properties.COUNTY_LABEL;
    const rowData = this.csvDataLookup[layerId][properties.COUNTY];

    let popupContent = `<strong>${countyLabel}</strong>`;
    if (rowData) {
      if (rowData.column2) {
        popupContent += `<br>Column 2: ${rowData.column2}`;
      }
      if (rowData.column3) {
        popupContent += `<br>Column 3: ${rowData.column3}`;
      }
    }

    return popupContent;
  } else if (layerId === 'municipalities') {
    const municipalityName = properties.NAME;
    return `<strong>${municipalityName}</strong>`;
  }
},





addMapInteractions(map, layerId) {
  const layer = this.layers.find(l => l.id === layerId);
  const layerName = layer.name;

  map.on('click', `${layerId}-layer`, (e) => {
    // Check if the layer is visible
    if (!layer.visible) {
      return;
    }

    const properties = e.features[0].properties;
    const popupContent = this.getPopupContent(layerId, properties);

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });

  map.on('mouseenter', `${layerId}-layer`, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', `${layerId}-layer`, () => {
    map.getCanvas().style.cursor = '';
  });
},







    toggleLayer(layerId) {
      const layer = this.layers.find(l => l.id === layerId);
      layer.visible = !layer.visible;
      const visibility = layer.visible ? 'visible' : 'none';

      this.map.setLayoutProperty(`${layerId}-layer`, 'visibility', visibility);
      this.map.setLayoutProperty(`${layerId}-outline`, 'visibility', visibility);
    }
  },
};
</script>

