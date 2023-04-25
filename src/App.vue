<!-- App.vue -->
<template>
 
  <MapboxMap
       v-if ="showMap"
       ref="mapboxMap"
       @open-housing-data-modal="handleHousingDataModal"
       :class="{ 'map-container': true, 'visible': isMapVisible }"
     />
 
  
   <FullPageWrapper :options="fullPageOptions" @onLeave="onSectionLeave">
  
   <FullPageSection>
    <div class="p-5 bg-image1">
      <MapOverlay class="map-overlay-full-top" 
        title='The Story of Affordable Housing in NJ'
        content='<i>An extremely abridged history and today&#39;s current need.</i>'
        />
    </div>
  </FullPageSection>
  


  <!-- <FullPageSection class="pointer-events-off">
   <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />
  </FullPageSection> -->


 
  <FullPageSection class="graph-container">
   <MapOverlay class="map-overlay-full-top"
        title='<h3>Affordable housing is a rich and complex network of driving forces.</h3>'
        content=''
        />
   <ForceDirectedGraph :data="graphData" />
 </FullPageSection>
 
 
 
 <!-- two column layout -->
 <FullPageSection>
   <div class="container-fluid">
     <div class="row">
       <div :class="{ 'col-md-6': true, 'two-column-left': true }">
         <div class="p-5">
           <br>
           <h2>From The landmark 1975 Mount Laurel Doctrine, which held that every town in the state must provide its “fair share” of the regional need for affordable housing…</h2>
              <br>
                  <p class="fs-4"><i>“As a developing municipality, Mount Laurel must, by its land use regulations, make realistically possible the opportunity for an appropriate variety and choice of housing for all categories of people who may desire to live there, of course including those of low and moderate income.”</i></p>
 
                  <footer class="blockquote-footer text-end"><cite title="Source Title"><h6>Exerpt from The Mount Laurel Doctrine.<br>Southern Burlington County NAACP v. Township of Mount Laurel (67 N.J. 151, 1975)</h6></cite></footer>
                
                  <br>
                </div>
              </div>
              <div class="col-md-6">
   <div class="bg-image2 two-column-right"></div>
 </div>
            </div>
          </div>
        </FullPageSection> 
  
  
        <FullPageSection>
   <div class="container-fluid">
     <div class="row">
       <div :class="{ 'col-md-6': true, 'two-column-left': true }">
         <div class="p-5">
           <br>
              <h2>…To the Fair Share Housing Center, a present-day organization fighting to ensure towns across NJ meet their Mount Laurel obligations.</h2>
              <br>
                  <p class="fs-4"><i>“Since 2015, Fair Share Housing Center has settled cases with more than 340 towns throughout New Jersey, which will lead to approximately 50,000 more affordable homes in the next decade.”</i></p>
 
                  <footer class="blockquote-footer text-end"><cite title="Source Title"><h6>Fair Share Housing Center</h6></cite></footer>
                  <br>
                </div>
              </div>
              <div class="col-md-6 nopadding">
   <div class="bg-image3 two-column-right"></div>
 </div>
            </div>
          </div>
        </FullPageSection> 
 
 
  <FullPageSection class="pointer-events-off">
   <MapOverlay 
   class="map-overlay-half" 
   title="Where do we stand now?" 
   content="Based on 2017 court projections, Mount Laurel calls for <b>305,504</b> affordable homes across the state by 2025.">
   <HorizontalBarGraph :data="barData" :visibleBars="[true, false, false]" />
  </MapOverlay>
  </FullPageSection>
  
 
  <FullPageSection class="pointer-events-off">
    <MapOverlay 
    class="map-overlay-half" 
    title="" 
    content="Based on 2022 estimates, we have <b>206,083</b> affordable homes… ">
    <HorizontalBarGraph :data="barData" :visibleBars="[true, true, false]" />
    </MapOverlay>
  </FullPageSection>
  
  
  <FullPageSection class="pointer-events-off">
    <MapOverlay 
    class="map-overlay-half" 
    title="" 
    content="<p>…Which meets <b>26%</b> of the need.</p><p>Roughly <b>797,109</b> renter households across the state are moderate to low income.</p>">
    <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />
    </MapOverlay>
  </FullPageSection>


      <FullPageSection>
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-2">
              </div>
              <div class="col-md-8">
                <div class="p-5">
                  <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />

                  <h2 class="pt-3">The gap is large. But devoted organizations and advocates across the state are fighting for change by leveraging Mount Laurel, Section 8, Federal HUD money, and more. </h2>
                <h2><b>Everyone can play a part...</b></h2>
                </div>
              </div>
              <div class="col-md-2">
              </div>
            </div>
          </div>
      </FullPageSection>
  
      <FullPageSection>
    <div class="p-5 bg-image4">
      <MapOverlay class="map-overlay-full-bottom" 
        title='… even if all you do is keep an open heart to denser smart housing built around you.'
        content='Shown is the Merwick Stanworth community in Princeton. This community adds 56 affordable homes.</i>'>
      </MapOverlay>
    </div>
   </FullPageSection>



    </FullPageWrapper>
  
    <HousingDataModal ref="housingDataModal" :fields="modalFields" />
  
  </template>
  
  
  <script>
  import FullPageWrapper from './components/FullPageWrapper.vue';
  import FullPageSection from './components/FullPageSection.vue';
  import MapboxMap from './components/MapboxMap.vue';
  import MapOverlay from './components/mapOverlay.vue';
  import ForceDirectedGraph from "./components/ForceDirectedGraph.vue";
  import HorizontalBarGraph from "./components/HorizontalBarGraph.vue";
  import HousingDataModal from './components/HousingDataModal.vue';
  import * as d3 from 'd3';
  
  export default {
    name: 'App',
    components: {
      FullPageWrapper,
      FullPageSection,
      MapboxMap,
      HousingDataModal,
      HorizontalBarGraph,
      ForceDirectedGraph,
      MapOverlay,
    },
    data() {
      return {
        modalTitle: '',
        modalFields: [],
        modalItems: [],
        isMapClickable: false,
        showMap: false,
        isMapVisible: false,
        graphData: {
   nodes: [
   {
      id: "1",
      name: "Public Entities",
      radius: 20,
      color: "#ae017e",
      title: "Public Entities",
      body: "Public Entities body text",
      icon: "",
    },
     { id: "2", name: "New Jersey Department of Community Affairs", radius: 10, color: "#dd3497" },
     { id: "3", name: "New Jersey Housing and Mortgage Finance Agency", radius: 10, color: "#dd3497" },
     { id: "4", name: "New Jersey Redevelopment Authority", radius: 10, color: "#dd3497" },
     { id: "13", name: "NJ Housing Resource Center", radius: 10, color: "#dd3497" },



     { id: "5", name: "Private Entities", radius: 20, color: "#0570b0" },
     { id: "6", name: "Housing and Community Development Network of New Jersey", radius: 10, color: "#3690c0" },
     { id: "7", name: "New Jersey Future", radius: 10, color: "#3690c0" },
     { id: "8", name: "Affordable Housing Professionals of New Jersey", radius: 10, color: "#3690c0" },
     { id: "9", name: "Fair Share Housing Center ", radius: 10, color: "#3690c0" },



     { id: "10", name: "Mount Laurel Doctrine", radius: 20, color: "#238443" },
     { id: "11", name: "Builder's Remedy", radius: 10, color: "#41AB5D" },
     { id: "12", name: "Rounds of Obligation", radius: 10, color: "#41AB5D" },


   ],
   links: [
     { source: "1", target: "2", value: 1 },
     { source: "1", target: "3", value: 1 },
     { source: "1", target: "4", value: 1 },
     { source: "1", target: "9", value: 1 },
     { source: "1", target: "13", value: 1 },
     { source: "5", target: "6", value: 1 },
     { source: "5", target: "7", value: 1 },
     { source: "5", target: "8", value: 1 },
     { source: "5", target: "9", value: 1 },
     { source: "10", target: "11", value: 1 },
     { source: "10", target: "12", value: 1 },






   ],
     },
 
     barData: [
         { label: "Mt. Laurel Projections", value: 305504, color: "#ae017e" },
         { label: "What we have", value: 206083, color: "#238443" },
         { label: "What we need", value: 797109, color: "#cc4c02" },
       ],
       visibleBars: [true, true, true],
 
 
        fullPageOptions: {
        normalScrollElements: '.map-container',
        },
        
 
 
 
 
 
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
      { key: 'tenure', label: 'Tenure' },
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
  
 
 
  // eslint-disable-next-line no-unused-vars
  onSectionLeave(origin, destination, direction) {
       if (destination.index === 4 || destination.index === 5 || destination.index === 6) {
         this.showMap = true;
         this.isMapVisible = true;
       } else {
         this.showMap = false;
         this.isMapVisible = false;
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
  
  .map-overlay-full-top {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    margin: 2%;
    pointer-events: auto;
  }

  .map-overlay-full-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    margin: 2%;
    pointer-events: auto;
  }


  
  .map-overlay-half {
   position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    margin: 2%;
    pointer-events: auto;
   max-width: 50%;
 }
 
 
  .pointer-events-off {
   pointer-events: none;
 
 }
 
 .map-overlay-full-top {
   pointer-events: auto;
 }
 
 
 
 
 .map-container {
   opacity: 0;
   animation-fill-mode: forwards;
 }
 
 .map-container.visible {
   animation-name: fadeIn;
   animation-duration: 1.5s;
 }
 
 @keyframes fadeIn {
   to {
     opacity: 1;
   }
 }
 
 
 
 
 @media (max-width: 767px) {
     .two-column-left {
       height: 50%;
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
     }
 
     .two-column-right {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
 }
   }
 
 
 
  </style>
 
 
 
 <style scoped>
  .bg-image1 {
    background-image: url('Merwick-Stanworth - Torti Gallas and Partners.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
 
 
  .bg-image2 {
   background-image: url('assets/MtLuarelNYTimage.jfif');
   background-position: center;
   background-repeat: no-repeat;
   background-size: contain;
   width: 100%;
   height: 100%;
   position: relative;
   padding-left: 10%;
   padding-right: 10%;
 }
 
 .bg-image3 {
   background-image: url('assets/FSHC Background.jpg');
 
   background-repeat: inherit;
   background-size: cover;
 
   height: 100vh;
   position: relative;
 }



 .bg-image4 {
    background-image: url('assets/princeton housing.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
   
  }
 
 .nopadding {
    padding: 0 !important;
    margin: 0 !important;
 }
 
 
 
 .graph-container {
   position: relative;
   width: 100vw;
   height: 100vh;
 }



 .fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

 </style>
 