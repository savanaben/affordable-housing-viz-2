<!-- App.vue -->
<template>
 
  <MapboxMap
       v-if ="showMap"
       ref="mapboxMap"
       @open-housing-data-modal="handleHousingDataModal"
       :class="{ 'map-container': true, 'visible': isMapVisible }"
       :currentIndex="destination.index"
     />
 
 


   <mapOverlayWchart 
   v-if="showMapOverlay"
   class="map-overlay-half" 
   :currentIndex="destination.index"
   >
  </mapOverlayWchart>

  
  
   <FullPageWrapper 
   :options="fullPageOptions" @onLeave="onSectionLeave"
   >
  
   <FullPageSection>
    <div class="p-5 bg-image1">
      <MapOverlay class="map-overlay-full-top" 
        title='&nbsp;The Story of Affordable Housing in NJ &nbsp;'
        content='
        
        <p class= "fs-4 text-center mb-0">An extremely abridged history and today&#39;s current need.</p>
        
        <br> <p class= "fs-5 text-center"><i>Scroll throughout the story to continue.</i></p>'
        />
        
        <MapOverlayTight class="map-overlay-bottom-right" 
        title=''
        content='<p class="fs-5 mb-0 mt-0 pt-0 pb-0"> <a href="https://www.princeton.edu/news/2012/01/19/plans-merwick-stanworth-housing-unveiled" target="_blank">Merwick and Stanworth Development</a> - Torti Gallas and Partners</p>'>
      </MapOverlayTight>


    </div>
  </FullPageSection>
  


  <!-- <FullPageSection class="pointer-events-off">
   <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />
  </FullPageSection> -->


 
  <FullPageSection class="graph-container">
   <!-- <MapOverlay class="map-overlay-full-top mb-0"
        title='<h3>Affordable housing is a rich and complex network of driving forces.</h3>'
        content=''
        /> -->

        <MapOverlayTight class="map-overlay-full-top"

        content='<h1 class="fs-3">Affordable housing is a rich and complex network of driving forces.</h1>'>
      </MapOverlayTight>


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
                  <p class="fs-6 text-end" style="color: rgb(94, 94, 94);">— Excerpt from The Mount Laurel Doctrine.<br>Southern Burlington County NAACP v.Township<br> of Mount Laurel (67 N.J. 151, 1975)</p>


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
 
                  <p class="fs-4 text-end" style="color: rgb(94, 94, 94);">— Fair Share Housing Center</p>

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
   <!-- <MapOverlay 
   class="map-overlay-half" 
   title="Where do we stand now?" 
   content="Based on 2017 court projections, Mount Laurel calls for <b>305,504</b> affordable homes across the state by 2025.">
   <HorizontalBarGraph :data="barData" :visibleBars="[true, false, false]" />
  </MapOverlay> -->
  </FullPageSection>
  
 
  <FullPageSection class="pointer-events-off">
    <!-- <MapOverlay 
    class="map-overlay-half" 
    title="" 
    content="Based on 2022 estimates, we have <b>206,083</b> affordable homes… ">
    <HorizontalBarGraph :data="barData" :visibleBars="[true, true, false]" />
    </MapOverlay> -->
  </FullPageSection>
  
  
  <FullPageSection class="pointer-events-off">
    <!-- <MapOverlay 
    class="map-overlay-half" 
    title="" 
    content="<p>…Which meets <b>26%</b> of the need.</p><p>Roughly <b>797,109</b> renter households across the state are moderate to low income.</p>">
    <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />
    </MapOverlay> -->
  </FullPageSection>


      <FullPageSection>
        <div class="container-fluid">
            <div class="row">
              <div class="col-md-2">
              </div>
              <div class="col-md-8">
                <div class="p-5">
                  <HorizontalBarGraph :data="barData" :visibleBars="[true, true, true]" />

                  <h3 class="pt-3" style="font-weight: 400;">The gap is large. But devoted organizations and advocates across the state are fighting for change by leveraging Mount Laurel, Section 8, Federal HUD money, and more. </h3>
                <h3><b>Everyone can play a part…</b></h3>
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
        title='<h3>…even if all you do is keep an open heart to denser smart housing built around you.</h3>'
        content='<i>Shown is the Merwick Stanworth community in Princeton. This community includes 56 affordable homes.</i>'>
      </MapOverlay>
    </div>
   </FullPageSection>


    </FullPageWrapper>
  

    <HousingDataModal 
    ref="housingDataModal" 
    :fields="modalFields" 
    />
  
  </template>
  
  
  <script>
  import FullPageWrapper from './components/FullPageWrapper.vue';
  import FullPageSection from './components/FullPageSection.vue';
  import MapboxMap from './components/MapboxMap.vue';
  import MapOverlay from './components/mapOverlay.vue';
  import MapOverlayTight from './components/mapOverlayTight.vue';
  import mapOverlayWchart from './components/mapOverlayWchart.vue';
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
      MapOverlayTight,
      mapOverlayWchart,
    },
    data() {
      return {
        modalTitle: '',
        modalFields: [],
        modalItems: [],
        isMapClickable: false,
        showMap: false,
        showMapOverlay: false,
        showModal: false, // Add a data property to track the modal's visibility
        destination: {
        index: 0, // Initialize the index property
        fullpageInstance: null,
       },

        isMapVisible: false,
        graphData: {
  //  nodes: [
  //  {
  //     id: "1",
  //     name: "Public Entities",
  //     radius: 20,
  //     color: "#ae017e",
  //     title: "Public Entities",
  //     body: "Public Entities body text",
  //     icon: "",
  //     style: {
  //     fontWeight: "bold",
  //     fontSize: "18px",
  //     },
  //   },
  //    { id: "2", name: "New Jersey Department of Community Affairs", radius: 10, color: "#dd3497" },
  //    { id: "3", name: "New Jersey Housing and Mortgage Finance Agency", radius: 10, color: "#dd3497" },
  //    { id: "4", name: "New Jersey Redevelopment Authority", radius: 10, color: "#dd3497" },
  //    { id: "13", name: "NJ Housing Resource Center", radius: 10, color: "#dd3497" },
  //    { id: "15", name: "Department of Housing and Urban Development", radius: 10, color: "#dd3497" },
  //    { id: "16", name: "Community Development Block Grant", radius: 10, color: "#dd3497" },
  //    { id: "17", name: "Housing Choice Voucher Program", radius: 10, color: "#dd3497" },
  //    { id: "18", name: "Public Housing Agency's", radius: 10, color: "#dd3497" },





  //    { id: "5", name: "Private Entities", radius: 20, color: "#0570b0", 
  //    style: {
  //     fontWeight: "bold",
  //     fontSize: "18px",
  //     },
  //     },
  //    { id: "6", name: "Housing and Community Development Network of New Jersey", radius: 10, color: "#3690c0" },
  //    { id: "7", name: "New Jersey Future", radius: 10, color: "#3690c0" },
  //    { id: "8", name: "Affordable Housing Professionals of New Jersey", radius: 10, color: "#3690c0" },
  //    { id: "9", name: "Fair Share Housing Center ", radius: 10, color: "#3690c0" },
  //    { id: "14", name: "Developers", radius: 10, color: "#3690c0" },



  //    { id: "10", name: "Mount Laurel Doctrine", radius: 20, color: "#238443",
  //    style: {
  //     fontWeight: "bold",
  //     fontSize: "18px",
  //     },
  //   },
  //    { id: "11", name: "Builder's Remedy", radius: 10, color: "#41AB5D" },
  //    { id: "12", name: "Rounds of Obligation", radius: 10, color: "#41AB5D" },


  //  ],



  nodes: [
{
"id": "1",
"name": "Public Entities",
"radius": 20,
"color": "#ae017e",
"title": "Public Entities",
"body": "Public Entities play a crucial role in affordable housing by providing funding, resources, and oversight to support housing initiatives and programs.",
"icon": "",
"style": {
"fontWeight": "bold",
"fontSize": "19px"
}
},
{
"id": "2",
"name": "New Jersey Department of Community Affairs",
"radius": 10,
"color": "#dd3497",
"title": "New Jersey Department of Community Affairs",
"body": "The New Jersey Department of Community Affairs (DCA) is responsible for administering affordable housing programs, providing grants, and overseeing housing-related policies in the state.",
"style": {
"fontWeight": "bold",
"fontSize": "15px"
}
},
{
"id": "3",
"name": "New Jersey Housing and Mortgage Finance Agency",
"radius": 10,
"color": "#dd3497",
"title": "New Jersey Housing and Mortgage Finance Agency",
"body": "The New Jersey Housing and Mortgage Finance Agency (NJHMFA) offers various financing options, mortgage assistance programs, and initiatives to promote affordable housing development in New Jersey.",
},
{
"id": "4",
"name": "New Jersey Redevelopment Authority",
"radius": 10,
"color": "#dd3497",
"title": "New Jersey Redevelopment Authority",
"body": "The New Jersey Redevelopment Authority (NJRA) supports affordable housing and community development projects, revitalizes neighborhoods, and fosters economic growth in the state.",
},
{
"id": "13",
"name": "NJ Housing Resource Center",
"radius": 10,
"color": "#dd3497",
"title": "NJ Housing Resource Center",
"body": "The NJ Housing Resource Center provides valuable information and resources to help individuals and families find affordable housing options, understand their rights, and access housing-related assistance programs.",
},
{
"id": "15",
"name": "Department of Housing and Urban Development",
"radius": 10,
"color": "#dd3497",
"title": "Department of Housing and Urban Development (HUD)",
"body": "The Department of Housing and Urban Development (HUD) is a federal agency that works closely with New Jersey to provide funding, programs, and support for affordable housing, community development, and fair housing initiatives.",
"style": {
"fontWeight": "bold",
"fontSize": "15px"
}
},
{
"id": "16",
"name": "Community Development Block Grant",
"radius": 10,
"color": "#dd3497",
"title": "Community Development Block Grant",
"body": "The Community Development Block Grant (CDBG) program, administered by HUD, provides funding to local communities in New Jersey to support a range of affordable housing, infrastructure, and community development projects.",
},
{
"id": "17",
"name": "Housing Choice Voucher Program",
"radius": 10,
"color": "#dd3497",
"title": "Housing Choice Voucher Program",
"body": "The Housing Choice Voucher Program, commonly known as Section 8, assists low-income individuals and families in New Jersey by providing rental assistance vouchers that can be used towards affordable housing in the private market.",
},
{
"id": "18",
"name": "Public Housing Agencies",
"radius": 10,
"color": "#dd3497",
"title": "Public Housing Agencies",
"body": "Public Housing Agencies (PHAs) collaborate with HUD and the New Jersey Department of Community Affairs to administer affordable housing programs, including the Housing Choice Voucher Program (Section 8), and manage public housing developments to provide safe and affordable housing options for low-income individuals and families."
},
{
"id": "19",
"name": "Low-Income Housing Tax Credit",
"radius": 10,
"color": "#dd3497",
"title": "Low-Income Housing Tax Credit",
"body": "The Low-Income Housing Tax Credit (LIHTC) in New Jersey is a federal program administered by the New Jersey Housing and Mortgage Finance Agency (NJHMFA) that provides tax incentives to developers to create affordable rental housing for low-income individuals and families, helping to increase the availability of affordable homes throughout the state."
},
{
"id": "20",
"name": "HOME Investment Partnerships Program",
"radius": 10,
"color": "#dd3497",
"title": "HOME Investment Partnerships Program",
"body": "The HOME Investment Partnerships Program is a federal grant program that provides funding to state and local governments, including New Jersey, to support the creation and preservation of affordable housing for low-income households."
},
{
"id": "5",
"name": "Private Entities",
"radius": 20,
"color": "#0570b0",
"title": "Private Entities",
"body": "Private entities contribute to affordable housing efforts by advocating for policy changes, providing expertise, and engaging in the development and preservation of affordable housing projects in New Jersey.",
"style": {
"fontWeight": "bold",
"fontSize": "19px"
}
},
{
"id": "6",
"name": "Housing and Community Development Network of New Jersey",
"radius": 10,
"color": "#3690c0",
"title": "Housing and Community Development Network of New Jersey",
"body": "The Housing and Community Development Network of New Jersey is a private entity that advocates for affordable housing, community development, and social equity, working with various stakeholders to promote policies and initiatives that address housing needs in the state."
},
{
"id": "7",
"name": "New Jersey Future",
"radius": 10,
"color": "#3690c0",
"title": "New Jersey Future",
"body": "New Jersey Future is a nonprofit organization that focuses on sustainable development, including affordable housing, infrastructure, and land use policies, to create thriving and equitable communities in New Jersey."
},
{
"id": "8",
"name": "Affordable Housing Professionals of New Jersey",
"radius": 10,
"color": "#3690c0",
"title": "Affordable Housing Professionals of New Jersey",
"body": "The Affordable Housing Professionals of New Jersey is an association of industry professionals dedicated to promoting affordable housing opportunities and fostering collaboration among stakeholders involved in affordable housing development and policy."
},
{
"id": "9",
"name": "Fair Share Housing Center",
"radius": 10,
"color": "#3690c0",
"title": "Fair Share Housing Center",
"body": "The Fair Share Housing Center is a nonprofit organization that advocates for fair housing practices and works to ensure that municipalities in New Jersey comply with their affordable housing obligations under the Mount Laurel Doctrine.",
"style": {
"fontWeight": "bold",
"fontSize": "15px"
}
},
{
"id": "14",
"name": "Developers",
"radius": 10,
"color": "#3690c0",
"title": "Developers",
"body": "Developers play a crucial role in affordable housing by constructing, rehabilitating, and managing affordable housing projects, partnering with government agencies, nonprofits, and private entities to provide safe and affordable homes for low-income individuals and families."
},
{
"id": "10",
"name": "Mount Laurel Doctrine",
"radius": 20,
"color": "#238443",
"title": "Mount Laurel Doctrine",
"body": "The Mount Laurel Doctrine, established by the New Jersey Supreme Court, mandates that municipalities provide their fair share of affordable housing and ensure that zoning and land-use policies do not perpetuate exclusionary practices, promoting socioeconomic diversity and access to affordable homes across the state.",
"style": {
"fontWeight": "bold",
"fontSize": "19px"
}
},
{
"id": "11",
"name": "Builder's Remedy",
"radius": 10,
"color": "#41AB5D",
"title": "Builder's Remedy",
"body": "Builder's Remedy is a legal provision derived from the Mount Laurel Doctrine that allows developers to sue municipalities who fail to fulfill their fair share obligation."
},
{
"id": "12",
"name": "Rounds of Obligation",
"radius": 10,
"color": "#41AB5D",
"title": "Rounds of Obligation",
"body": "Rounds of Obligation refer to periodic cycles in which previously COAH, or lately the courts, determines the Mt. Laurel housing obligations for municipalities, ensuring that they continually address their fair share responsibilities and provide affordable housing opportunities."
}
],



   links: [
     { source: "1", target: "2", value: 1 },
     { source: "1", target: "3", value: 1 },
     { source: "1", target: "4", value: 1 },
     { source: "1", target: "9", value: 1 },
     { source: "1", target: "13", value: 1 },
     { source: "1", target: "15", value: 1 },
     { source: "1", target: "18", value: 1 },

     { source: "2", target: "17", value: 1 },



     { source: "5", target: "6", value: 1 },
     { source: "5", target: "7", value: 1 },
     { source: "5", target: "8", value: 1 },
     { source: "5", target: "9", value: 1 },
     { source: "5", target: "14", value: 1 },

     { source: "10", target: "11", value: 1 },
     { source: "10", target: "12", value: 1 },
     { source: "10", target: "9", value: 1 },
     { source: "10", target: "1", value: 1 },

     { source: "11", target: "14", value: 1 },

     { source: "15", target: "16", value: 1 },
     { source: "15", target: "17", value: 1 },
     { source: "15", target: "19", value: 1 },
     { source: "15", target: "20", value: 1 },


     { source: "19", target: "3", value: 1 },




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
  



  
    computed: {
    destinationIndex() {
      return this.destination.index;
    },
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
    this.showModal = true; // Set showModal to true when the modal is shown
  },
  



  // handleDisableScrolling() {
  //   if (this.$refs.fullPageWrapper && this.$refs.fullPageWrapper.fullpageInstance) {
  //     this.$refs.fullPageWrapper.fullpageInstance.setAllowScrolling(false);
  //     this.$refs.fullPageWrapper.fullpageInstance.setKeyboardScrolling(false);
  //   }
  // },
  // handleEnableScrolling() {
  //   if (this.$refs.fullPageWrapper && this.$refs.fullPageWrapper.fullpageInstance) {
  //     this.$refs.fullPageWrapper.fullpageInstance.setAllowScrolling(true);
  //     this.$refs.fullPageWrapper.fullpageInstance.setKeyboardScrolling(true);
  //   }
  // },





 
  // eslint-disable-next-line no-unused-vars
  onSectionLeave(origin, destination, direction) {

    console.log("destination:", destination);
   console.log("destination.index:", destination.index);


       if (destination.index === 4 || destination.index === 5 || destination.index === 6) {
         this.showMap = true;
         this.isMapVisible = true;
         this.showMapOverlay = true;
       } else {
         this.showMap = false;
         this.isMapVisible = false;
         this.showMapOverlay = false;
       }

       this.destination.index = destination.index;


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
  



  .popup-container {
      max-width: 370px;
      font: 14px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
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
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 4px;
  }

  .map-overlay-full-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    margin: 2%;
    pointer-events: auto;
    padding: 0.2rem;
  }

  .map-overlay-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    margin: 1%;
    background-color: rgba(255, 255, 255, 0.904);
    border-radius: 4px;
    pointer-events: auto;
  }


  .map-overlay-outside {
    position: absolute;
    top: 0;
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
   animation-duration: 2s;
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
  
  .row {
    place-items:center;
  }
  
  
  .bg-image1 {
    background-image: url('Merwick-Stanworth - Torti Gallas and Partners.svg');
    background-position: bottom left;
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
   height: 90vh;
   position: relative;
   padding-left: 10%;
   padding-right: 10%;
 }
 
 .bg-image3 {
   background-image: url('assets/FSHC Background.jpg');
   background-repeat: inherit;
   background-size: cover;
   background-position: center;
   height: 100vh;
   position: relative;
 }



 .bg-image4 {
    background-image: url('assets/princeton housing.jpg');
    background-position: top center;
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
 