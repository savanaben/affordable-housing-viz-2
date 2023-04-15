<template>
  <div>
    <!-- Change: Separate buttons for each layer -->
    <button @click="showMunicipalitiesLayer" style="position: absolute; top: 20px; right: 20px; z-index: 9999;">
      Municipalities
    </button>
    <button @click="showCountiesLayer" style="position: absolute; top: 50px; right: 20px; z-index: 9999;">
      Counties
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
  components: {
  },
  data() {
    return {
      map: null,
      currentPopup: null,
      layers: [
        {
          id: 'states',
          name: 'County Data',
          geoJsonUrl: 'geoJSON/County_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
          csvUrl: '/data-csvs/County_data.csv',
          fillColor: 'rgba(200, 100, 240, 0.22)',
          lineColor: 'rgba(200, 100, 240, 1)',
          lineWidth: 2,
          visible: true
        },
        {
          id: 'municipalities',
          name: 'Municipality Data',
          geoJsonUrl: 'geoJSON/Municipal_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
          csvUrl: '/data-csvs/Total_Units_per_Comu.csv', 
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
  this.initMap().then(() => {
    this.map.getCanvasContainer().addEventListener('mouseenter', () => {
      this.$emit('disable-scrolling');
    });

    this.map.getCanvasContainer().addEventListener('mouseleave', () => {
      this.$emit('enable-scrolling');
    });
  });
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

  const basePath = process.env.NODE_ENV === 'production'
    ? '/affordable-housing-viz-2/'
    : '';

  for (const layer of this.layers) {
    if (layer.csvUrl) {
      const lookup = await this.fetchCsvData(`${basePath}${layer.csvUrl}`, layer.id);
      this.csvDataLookup[layer.id] = lookup;
    }
  }

  return new Promise((resolve) => {
    map.on('load', async () => {
      for (const layer of this.layers) {
        this.loadLayer(map, {
          ...layer,
          geoJsonUrl: `${basePath}${layer.geoJsonUrl}`,
        });
      }
      resolve();
    });
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


    
async fetchCsvData(csvUrl, layerId) {
  const response = await d3.csv(csvUrl);
  const lookup = {};
  response.forEach(row => {
    const key = layerId === 'municipalities' ? row.comuMerged : row.COUNTY;
    lookup[key] = {
      column2: row.column2,
      column3: row.column3,
      units: row.units 
    };
  });

  return lookup;
},

//this is helping create the modal button
createDetailedHousingDataButton(municipalityName, comuMerged) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn', 'btn-info', 'mt-2');
  button.textContent = 'Detailed Housing Data';
  button.addEventListener('click', () => this.openHousingDataModal(municipalityName, comuMerged));
  return button;
},



  // this is i think adding the data to the modal
  async openHousingDataModal(municipalityName, comuMerged) {

    this.$emit('open-housing-data-modal', {
      municipalityName,
      comuMerged,
    });

    this.modalTitle = `${municipalityName} - Detailed Housing Data`;
    
    this.modalFields = [
      { key: 'comuMerged', label: 'Municipality Code' },
      { key: 'development / aka', label: 'Development' },
      { key: 'units', label: 'Units' },
      { key: 'type', label: 'Type' },
      { key: 'agent', label: 'Agent' },
      { key: 'agent address', label: 'Agent Address' },
      { key: 'website', label: 'Website' },
      { key: 'source', label: 'Source' },
      { key: 'zip', label: 'ZIP' },
      { key: 'combinedPhone', label: 'Phone' },
    ];
    
    const basePath = process.env.NODE_ENV === 'production'
      ? '/affordable-housing-viz-2/'
      : '';
    
    const csvData = await d3.csv(`${basePath}/data-csvs/Municipal-level-housing-data.csv`);
    this.modalItems = csvData.filter(row => row.comuMerged === comuMerged);
    
    this.$refs.housingDataModal.showModal();
  },






getPopupContent(layerId, properties) {


  if (layerId === 'states') {
    const countyLabel = properties.COUNTY_LABEL;
    const rowData = this.csvDataLookup[layerId][properties.COUNTY];

    const popupContent = document.createElement('div');
    popupContent.innerHTML = `<strong>${countyLabel}</strong>`;
    if (rowData) {
      if (rowData.column2) {
        const column2Element = document.createElement('div');
        column2Element.innerHTML = `Column 2: ${rowData.column2}`;
        popupContent.appendChild(column2Element);
      }
      if (rowData.column3) {
        const column3Element = document.createElement('div');
        column3Element.innerHTML = `Column 3: ${rowData.column3}`;
        popupContent.appendChild(column3Element);
      }
    }
    return popupContent;



  } else if (layerId === 'municipalities') {
  const municipalityName = properties.NAME;
  const rowData = this.csvDataLookup[layerId][properties.MUN_CODE]; 

  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<strong>${municipalityName}</strong>`;
  if (rowData && rowData.units) {
    const unitsElement = document.createElement('div');
    unitsElement.innerHTML = `Units: ${rowData.units}`;
    popupContent.appendChild(unitsElement);
  }

  const button = this.createDetailedHousingDataButton(municipalityName, properties.MUN_CODE);
  popupContent.appendChild(button);

  return popupContent;
  }
},




addMapInteractions(map, layerId) {
  const layer = this.layers.find(l => l.id === layerId);


  map.on('click', `${layerId}-layer`, (e) => {
    // Check if the layer is visible
    if (!layer.visible) {
      return;
    }

    const properties = e.features[0].properties;
    const popupContent = this.getPopupContent(layerId, properties);

    // Close the current popup if it exists
    if (this.currentPopup) {
      this.currentPopup.remove();
    }

    // Create a new popup and store it in the currentPopup data property
    this.currentPopup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setDOMContent(popupContent)
      .addTo(map);
  });


  this.$nextTick(() => {
  const detailedHousingDataBtn = document.getElementById('detailedHousingDataBtn');
  if (detailedHousingDataBtn) {
    detailedHousingDataBtn.addEventListener('click', () => {
      this.openHousingDataModal(municipalityName, properties.MUN_CODE);
    });
  }
});

  map.on('mouseenter', `${layerId}-layer`, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', `${layerId}-layer`, () => {
    map.getCanvas().style.cursor = '';
  });
},




showMunicipalitiesLayer() {
      const layerId = 'municipalities';
      this.layers.forEach(layer => {
        layer.visible = layer.id === layerId;
        const visibility = layer.visible ? 'visible' : 'none';
        this.map.setLayoutProperty(`${layer.id}-layer`, 'visibility', visibility);
        this.map.setLayoutProperty(`${layer.id}-outline`, 'visibility', visibility);
      });
        // Close the current popup if it exists
  if (this.currentPopup) {
    this.currentPopup.remove();
  }
      this.addMapInteractions(this.map, layerId);
    },


showCountiesLayer() {
      const layerId = 'states';
      this.layers.forEach(layer => {
        layer.visible = layer.id === layerId;
        const visibility = layer.visible ? 'visible' : 'none';
        this.map.setLayoutProperty(`${layer.id}-layer`, 'visibility', visibility);
        this.map.setLayoutProperty(`${layer.id}-outline`, 'visibility', visibility);
      });
        // Close the current popup if it exists
  if (this.currentPopup) {
    this.currentPopup.remove();
  }
      this.addMapInteractions(this.map, layerId);
    }
  },
};


</script>

