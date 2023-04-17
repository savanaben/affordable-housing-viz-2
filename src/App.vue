<!-- App.vue -->
<template>
 
 <div   class="map-container"
  :class="isMapClickable ? 'clickable' : 'not-clickable'">
    <MapboxMap @open-housing-data-modal="handleHousingDataModal"></MapboxMap>
  </div>
 
 <FullPageWrapper @onLeave="onSectionLeave">
    <FullPageSection>
  <div class="p-5 bg-image">
    <MapOverlay 
      title="New Jersey Affordable Housing"
      content="The successes of Mount Laurel, yet the unmet need for affordable housing in New Jersey."
      />
  </div>
</FullPageSection>
    <FullPageSection>
      <div class="p-5">
          <h1>Affordable housing and the Mount Laurel Act</h1>
          <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here https://www.princeton.edu/news/2012/01/19/plans-merwick-stanworth-housing-unveiled</p>
      </div>
    </FullPageSection>
    <FullPageSection>
      <div class="p-5">
          <h1>The need is high</h1>
          <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here https://www.princeton.edu/news/2012/01/19/plans-merwick-stanworth-housing-unveiled</p>
      </div>
    </FullPageSection>
 <!-- two column layout  -->
    <!-- <FullPageSection>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="p-5">
                <h1>test title</h1>
                <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here</p>
              </div>
            </div>
            <div class="col-md-6">
              <MapboxMap @open-housing-data-modal="handleHousingDataModal" />
            </div>
          </div>
        </div>
      </FullPageSection> -->

    <FullPageSection>
      <MapOverlay 
      title="The need is high"
       content="Custom content text here."
      />
    </FullPageSection>


    <FullPageSection>
      <MapOverlay 
      title="The need is higher!"
      content="Custom content text here."
      />
    </FullPageSection>


    <FullPageSection>
      <div class="container-fluid">
          <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
              <div class="p-5">
                <h1>Test Scroll in a Page</h1>
              </div>
            </div>
            <div class="col-md-2">
            </div>
          </div>
        </div>
    </FullPageSection>

    <FullPageSection>
      <div class="p-5">
          <h1>Some title test</h1>
          <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here</p>
      </div>
    </FullPageSection>
  </FullPageWrapper>

  <HousingDataModal ref="housingDataModal" :fields="modalFields" />

</template>

<!-- <script>
import FullPageWrapper from './components/FullPageWrapper.vue';
import FullPageSection from './components/FullPageSection.vue';
import MapboxMap from './components/MapboxMap.vue';
import HousingDataModal from './components/HousingDataModal.vue';


export default {
  name: 'App',
  components: {
    FullPageWrapper,
    FullPageSection,
    MapboxMap,
    HousingDataModal,
  },
  
  methods: {

    handleHousingDataModal({ municipalityName, munCode }) {
  this.$refs.housingDataModal.modalTitle = municipalityName;
  // Fetch data based on munCode and assign it to the localItems
  const data = this.fetchDataBasedOnMunCode(munCode); // Implement this method to fetch data based on munCode
  this.$refs.housingDataModal.updateItems(data);
  this.$refs.housingDataModal.showModal();
},

 // eslint-disable-next-line no-unused-vars
fetchDataBasedOnMunCode(munCode) {

    // Fetch data based on munCode and return the array of items
  },




  },


};

</script> -->


<script>
import FullPageWrapper from './components/FullPageWrapper.vue';
import FullPageSection from './components/FullPageSection.vue';
import MapboxMap from './components/MapboxMap.vue';
import MapOverlay from './components/mapOverlay.vue';
import HousingDataModal from './components/HousingDataModal.vue';
import * as d3 from 'd3';

export default {
  name: 'App',
  components: {
    FullPageWrapper,
    FullPageSection,
    MapboxMap,
    HousingDataModal,
    MapOverlay,
  },
  data() {
    return {
      modalTitle: '',
      modalFields: [],
      modalItems: [],
      isMapClickable: false,
    };
  },


  methods: {
    async handleHousingDataModal({ municipalityName, munCode }) {
  this.$refs.housingDataModal.modalTitle = municipalityName;
  const basePath = process.env.NODE_ENV === 'production'
    ? '/affordable-housing-viz-2/'
    : '';
  const csvData = await d3.csv(`${basePath}/data-csvs/Municipal-level-housing-data.csv`);
  const data = csvData.filter(row => row.comuMerged === munCode);
  this.modalFields = [
 
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
  this.$refs.housingDataModal.updateItems(data);
  this.$refs.housingDataModal.showModal();
},



onSectionLeave(origin, destination) {
  const mapContainer = document.querySelector(".map-container");
  if (destination.index === 3 || destination.index === 4) {
    mapContainer.classList.add("show-map");
    document.body.classList.add("disable-pointer-events");
  } else {
    mapContainer.classList.remove("show-map");
    document.body.classList.remove("disable-pointer-events");
  }
},




  },
};
</script>



<style>

body { margin: 0; padding: 0; }
#map { position: absolute; 
       top: 0; 
       bottom: 0; 
       height: 100%;
       width: 100%;

}

.mapboxgl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

body.no-scroll {
  overflow: hidden !important;
}

body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  margin: 2%;

}

.bg-image {
  background-image: url('Merwick-Stanworth - Torti Gallas and Partners.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}




.map-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: visibility 0.5s, opacity 0.5s;
  }

  .map-container.show-map {
    z-index: auto;
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }


  .map-container.not-clickable {
    pointer-events: auto;
  }

  .map-container.clickable {
    pointer-events: auto;
  }


</style>