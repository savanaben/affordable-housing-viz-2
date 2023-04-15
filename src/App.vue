<!-- App.vue -->
<template>
  <FullPageWrapper>
    <FullPageSection>
      <div class="p-5">
          <h1>Some title test</h1>
          <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here</p>
      </div>
    </FullPageSection>

    <FullPageSection>
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
              <!--
              <MapboxMap @disable-scrolling="disableScrolling" @enable-scrolling="enableScrolling" ref="fullPageWrapper" />
                -->
            </div>
          </div>
        </div>
      </FullPageSection>

    <FullPageSection>
      <div class="container-fluid">
          <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
              <div class="p-5">
                <h1>Test Scroll in a Page</h1>
                <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome </p>
                <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome </p>
                <p class="fs-4">Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text hereSome </p>
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
    <HousingDataModal ref="housingDataModal" />
  </FullPageWrapper>



</template>

<script>
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
    handleHousingDataModal({ municipalityName, comuMerged }) {
      this.$refs.housingDataModal.openHousingDataModal(municipalityName, comuMerged);
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

</style>