<template>
  <div>
    <!-- Change: Separate buttons for each layer -->
    <button class="btn btn-primary mt-2" @click="showCountiesLayer" style="position: absolute; top: 20px; right: 20px; z-index: 9999;">
      Counties
    </button>
    <button class="btn btn-primary mt-2" @click="showMunicipalitiesLayer" style="position: absolute; top: 60px; right: 20px; z-index: 9999;">
      Municipalities
    </button>
    <button class="btn btn-primary mt-2" @click="showJacobsonLayer" style="position: absolute; top: 100px; right: 20px; z-index: 9999;">
  Jacobson
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
          lineColor: '#3a3a3a',
          lineWidth: 1,
          visible: true
        },
        {
          id: 'municipalities',
          name: 'Municipality Data',
          geoJsonUrl: 'geoJSON/Municipal_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
          csvUrl: '/data-csvs/Total_Units_per_Comu.csv', 
          fillColor: 'rgba(200, 100, 240, 0.22)',
          lineColor: '#3a3a3a',
          lineWidth: 1,
          visible: false
        },
        {
           id: 'jacobson',
           name: 'Jacobson Data',
           geoJsonUrl: 'geoJSON/Municipal_Boundaries_of_NJ2C_Hosted2C_3857.geojson',
           csvUrl: '/data-csvs/Total_Units_per_Comu.csv',
           fillColor: 'rgba(200, 100, 240, 0.22)',
           lineColor: '#3a3a3a',
           lineWidth: 1,
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
    center: [-75.7057, 40.1583],
    zoom: 7.3
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

  this.addMapInteractions(map, layerConfig); // Pass the entire layerConfig object
},


    
async fetchCsvData(csvUrl, layerId) {
  const response = await d3.csv(csvUrl);
  const lookup = {};
  response.forEach(row => {
    if (layerId === 'municipalities') {
  const key = row.comuMerged;
  lookup[key] = {
    column2: row.column2,
    column3: row.column3,
    units: row.units 
  };
} else if (layerId === 'jacobson') {
  const key = row.comuMerged; // Assuming the 'jacobson' layer uses the same key as the 'municipalities' layer
  lookup[key] = {
    total: row["Total"],
    priorRound: row["Prior Round Obligations (1987-1999)"],
    presentNeed: row["Present Need (2015)"],
    gapPresentNeed: row["Gap Present Need (2015)"],
    prospectiveNeed: row["Prospective Need (2015-2025)"],
    prospectiveGapPresent: row["Prospective + Gap Present"]
  };
} else {
  const key = row.COUNTY;
  lookup[key] = {
    column2: row.column2,
    column3: row.column3,
    units: row.units 
  };
}

  });

  return lookup;
},

//this is helping create the modal button
createDetailedHousingDataButton(municipalityName, comuMerged) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn', 'mt-2', 'btn-primary', 'btn-sm' );
  button.textContent = 'Detailed Housing Data';
  button.addEventListener('click', () => this.openHousingDataModal(municipalityName, comuMerged));
  return button;
},



  // this is i think adding the data to the modal
  async openHousingDataModal(municipalityName, comuMerged) {
  this.$emit('open-housing-data-modal', {
    municipalityName,
    comuMerged,
    items: [],
  });
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
  }


  else if (layerId === 'municipalities') {
  const municipalityName = properties.NAME;
  const rowData = this.csvDataLookup[layerId][properties.MUN_CODE]; 

  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h5><strong>${municipalityName}</strong></h5>`;
  if (rowData && rowData.units) {
    const unitsElement = document.createElement('div');
    unitsElement.innerHTML = `Units: ${rowData.units}`;
    popupContent.appendChild(unitsElement);
  }

  const button = this.createDetailedHousingDataButton(municipalityName, properties.MUN_CODE);
  popupContent.appendChild(button);

  return popupContent;
  }


 
  else if (layerId === 'jacobson') {
  const municipalityName = properties.NAME;
  const rowData = this.csvDataLookup[layerId][properties.MUN_CODE];

  console.log('rowData', rowData); // First console log

  const popupContent = document.createElement('div');
  popupContent.innerHTML = `<h5><strong>${municipalityName}</strong></h5>`;
  if (rowData) {
    if (rowData.total) {
      const totalElement = document.createElement('div');
      totalElement.innerHTML = `<strong>Total: ${rowData.total}<strong>`;
      popupContent.appendChild(totalElement);
    }
    if (rowData.priorRound) {
      const priorRoundElement = document.createElement('div');
      priorRoundElement.innerHTML = `Prior Round Obligations (1987-1999): ${rowData.priorRound}`;
      popupContent.appendChild(priorRoundElement);
    }
    if (rowData.presentNeed) {
      const presentNeedElement = document.createElement('div');
      presentNeedElement.innerHTML = `Present Need (2015): ${rowData.presentNeed}`;
      popupContent.appendChild(presentNeedElement);
    }
    if (rowData.gapPresentNeed) {
      const gapPresentNeedElement = document.createElement('div');
      gapPresentNeedElement.innerHTML = `Gap Present Need (2015): ${rowData.gapPresentNeed}`;
      popupContent.appendChild(gapPresentNeedElement);
    }
    if (rowData.prospectiveNeed) {
      const prospectiveNeedElement = document.createElement('div');
      prospectiveNeedElement.innerHTML = `Prospective Need (2015-2025): ${rowData.prospectiveNeed}`;
      popupContent.appendChild(prospectiveNeedElement);
    }
    if (rowData.prospectiveGapPresent) {
      const prospectiveGapElement = document.createElement('div');
      prospectiveGapElement.innerHTML = `Prospective + Gap Present: ${rowData.prospectiveGapPresent}`;
      popupContent.appendChild(prospectiveGapElement);
    }
  }

  else {
      console.log('No rowData found for', properties.MUN_CODE); // Second console log
  }

  return popupContent;
}

},




 getColorSet(colorSetName) {
  const colorSets = {
    default: [
      { value: 1, color: "#f7fcfd" },
      { value: 5, color: "#e0ecf4" },
      { value: 28, color: "#bfd3e6" },
      { value: 149, color: "#9ebcda" },
      { value: 791, color: "#8c96c6" },
      { value: 4196, color: "#8856a7" },
      { value: Infinity, color: "#810f7c" },
    ],
    jacobson: [
    { value: 1, color: "#ffffcc" },
      { value: 4, color: "#d9f0a3" },
      { value: 17, color: "#addd8e" },
      { value: 73, color: "#78c679" },
      { value: 303, color: "#41ab5d" },
      { value: 1266, color: "#238443" },
      { value: Infinity, color: "#005a32" },
    ],
  };

  return colorSets[colorSetName] || colorSets.default;
},

 getFillColor(units, colorSetName) {
  const colorSet = this.getColorSet(colorSetName);
  const value = parseInt(units, 10);
  
  for (const colorStop of colorSet) {
    if (value <= colorStop.value) {
      return colorStop.color;
    }
  }
},


addMapInteractions(map, layerConfig) {
  const layerId = layerConfig.id;
  const layer = this.layers.find(l => l.id === layerId);



// Update the fill-color property for the municipalities layer based on "units"
if (layerId === 'municipalities') {
  const expression = [
    'match', ['get', 'MUN_CODE'],
    ...Object.entries(this.csvDataLookup[layerId]).flatMap(([key, value]) => [key, this.getFillColor(value.units, 'default')]),
    'rgba(0, 0, 0, 0)'
  ];

  map.setPaintProperty(`${layerId}-layer`, 'fill-color', expression);
}

// Update the fill-color property for the jacobson layer (based on "Total")
if (layerId === 'jacobson') {
  const expression = [
    'match', ['get', 'MUN_CODE'],
    ...Object.entries(this.csvDataLookup[layerId]).flatMap(([key, value]) => [key, this.getFillColor(value.total, 'jacobson')]),
    'rgba(0, 0, 0, 0)'
  ];

  map.setPaintProperty(`${layerId}-layer`, 'fill-color', expression);
}






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

    // Check if the "Detailed Housing Data" button exists
    const detailedHousingDataButton = popupContent.querySelector('button');

    if (detailedHousingDataButton) {
      // Add click event listener to the "Detailed Housing Data" button
      detailedHousingDataButton.addEventListener('click', () => {
  this.$emit('open-housing-data-modal', { municipalityName: properties.NAME, munCode: properties.MUN_CODE });
});


      // detailedHousingDataButton.addEventListener('click', () => {
      //   this.openHousingDataModal(properties.NAME, properties.MUN_CODE);
      // });



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

    showJacobsonLayer() {
  const layerId = 'jacobson';
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


<style>
.mapboxgl-popup-content {
  background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    padding: 10px 20px 10px 10px;
    pointer-events: auto;
    position: relative;
    font-size: 1rem;
    width: max-content;
    max-width: 400px;
}


</style>
