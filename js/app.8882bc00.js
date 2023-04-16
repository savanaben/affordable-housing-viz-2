(function(){"use strict";var e={1633:function(e,t,n){var i=n(9242),o=n(3396);const a={class:"p-5 bg-image"},l=(0,o._)("div",{class:"p-5"},[(0,o._)("h1",null,"Affordable housing and the Mount Laurel Act"),(0,o._)("p",{class:"fs-4"},"Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here https://www.princeton.edu/news/2012/01/19/plans-merwick-stanworth-housing-unveiled")],-1),s=(0,o._)("div",{class:"p-5"},[(0,o._)("h1",null,"The need is high"),(0,o._)("p",{class:"fs-4"},"Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here https://www.princeton.edu/news/2012/01/19/plans-merwick-stanworth-housing-unveiled")],-1),r=(0,o._)("div",{class:"container-fluid"},[(0,o._)("div",{class:"row"},[(0,o._)("div",{class:"col-md-2"}),(0,o._)("div",{class:"col-md-8"},[(0,o._)("div",{class:"p-5"},[(0,o._)("h1",null,"Test Scroll in a Page")])]),(0,o._)("div",{class:"col-md-2"})])],-1),d=(0,o._)("div",{class:"p-5"},[(0,o._)("h1",null,"Some title test"),(0,o._)("p",{class:"fs-4"},"Some title test text here Some title test text here Some title test text here Some title test text hereSome title test text hereSome title test text here")],-1);function u(e,t,n,i,u,c){const p=(0,o.up)("MapOverlay"),m=(0,o.up)("FullPageSection"),h=(0,o.up)("MapboxMap"),f=(0,o.up)("FullPageWrapper"),g=(0,o.up)("HousingDataModal");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(f,null,{default:(0,o.w5)((()=>[(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[(0,o._)("div",a,[(0,o.Wm)(p,{title:"New Jersey Affordable Housing",content:"The successes of Mount Laurel, yet the unmet need for affordable housing in New Jersey."})])])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[l])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[s])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[(0,o.Wm)(h,{onOpenHousingDataModal:c.handleHousingDataModal},null,8,["onOpenHousingDataModal"]),(0,o.Wm)(p,{title:"The need is high",content:"Custom content text here."})])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[r])),_:1}),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[d])),_:1})])),_:1}),(0,o.Wm)(g,{ref:"housingDataModal",fields:u.modalFields},null,8,["fields"])],64)}function c(e,t,n,i,a,l){return(0,o.wg)(),(0,o.iD)("div",{id:"fullpage",ref:"fullPageWrapper",onDisableScrolling:t[0]||(t[0]=(...e)=>l.disableScrolling&&l.disableScrolling(...e)),onEnableScrolling:t[1]||(t[1]=(...e)=>l.enableScrolling&&l.enableScrolling(...e))},[(0,o.WI)(e.$slots,"default",{},void 0,!0)],544)}var p=n(2120),m=n.n(p),h={name:"FullPageWrapper",data(){return{fullpageInstance:null}},mounted(){this.$nextTick((()=>{this.fullpageInstance=new(m())(this.$refs.fullPageWrapper,{})}))},beforeUnmount(){this.fullpageInstance&&this.fullpageInstance.destroy("all")},methods:{disableScrolling(){this.fullpageInstance&&(this.fullpageInstance.setAllowScrolling(!1),this.fullpageInstance.setKeyboardScrolling(!1))},enableScrolling(){this.fullpageInstance&&(this.fullpageInstance.setAllowScrolling(!0),this.fullpageInstance.setKeyboardScrolling(!0))}}},f=n(89);const g=(0,f.Z)(h,[["render",c],["__scopeId","data-v-405ee68a"]]);var v=g;const y={class:"section"};function b(e,t,n,i,a,l){return(0,o.wg)(),(0,o.iD)("div",y,[(0,o.WI)(e.$slots,"default",{},void 0,!0)])}var w={name:"FullPageSection"};const _=(0,f.Z)(w,[["render",b],["__scopeId","data-v-363504a8"]]);var M=_;const C=(0,o._)("div",{id:"map"},null,-1);function D(e,t,n,i,a,l){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("button",{class:"btn btn-primary mt-2",onClick:t[0]||(t[0]=(...e)=>l.showMunicipalitiesLayer&&l.showMunicipalitiesLayer(...e)),style:{position:"absolute",top:"20px",right:"20px","z-index":"9999"}}," Municipalities "),(0,o._)("button",{class:"btn btn-primary mt-2",onClick:t[1]||(t[1]=(...e)=>l.showCountiesLayer&&l.showCountiesLayer(...e)),style:{position:"absolute",top:"60px",right:"20px","z-index":"9999"}}," Counties "),C])}var S=n(7709),x=n.n(S),k=n(3168),L={name:"MapboxMap",components:{},data(){return{map:null,currentPopup:null,layers:[{id:"states",name:"County Data",geoJsonUrl:"geoJSON/County_Boundaries_of_NJ2C_Hosted2C_3857.geojson",csvUrl:"/data-csvs/County_data.csv",fillColor:"rgba(200, 100, 240, 0.22)",lineColor:"#3a3a3a",lineWidth:1,visible:!0},{id:"municipalities",name:"Municipality Data",geoJsonUrl:"geoJSON/Municipal_Boundaries_of_NJ2C_Hosted2C_3857.geojson",csvUrl:"/data-csvs/Total_Units_per_Comu.csv",fillColor:"rgba(200, 100, 240, 0.22)",lineColor:"#3a3a3a",lineWidth:1,visible:!1}],csvDataLookup:{}}},mounted(){this.initMap().then((()=>{this.map.getCanvasContainer().addEventListener("mouseenter",(()=>{this.$emit("disable-scrolling")})),this.map.getCanvasContainer().addEventListener("mouseleave",(()=>{this.$emit("enable-scrolling")}))}))},methods:{getFillColor(e){const t=parseInt(e,10);return t<=1?"#f7fcfd":t<=5?"#e0ecf4":t<=28?"#bfd3e6":t<=149?"#9ebcda":t<=791?"#8c96c6":t<=4196?"#8856a7":"#810f7c"},async initMap(){x().accessToken="pk.eyJ1Ijoic2F2YW5hYmVuIiwiYSI6ImNsZTNobWs4YjA0eGkzcG1wZzhycjZrb3cifQ.4_Du3FBo2v9tdy2DZRhb6A";const e=new(x().Map)({container:"map",style:"mapbox://styles/mapbox/light-v11",center:[-75.7057,40.1583],zoom:7.3});this.map=e;const t="/affordable-housing-viz-2/";for(const n of this.layers)if(n.csvUrl){const e=await this.fetchCsvData(`${t}${n.csvUrl}`,n.id);this.csvDataLookup[n.id]=e}return new Promise((n=>{e.on("load",(async()=>{for(const n of this.layers)this.loadLayer(e,{...n,geoJsonUrl:`${t}${n.geoJsonUrl}`});n()}))}))},async loadLayer(e,t){e.addSource(t.id,{type:"geojson",data:t.geoJsonUrl}),e.addLayer({id:`${t.id}-layer`,type:"fill",source:t.id,paint:{"fill-color":t.fillColor},layout:{visibility:t.visible?"visible":"none"}}),e.addLayer({id:`${t.id}-outline`,type:"line",source:t.id,paint:{"line-color":t.lineColor,"line-width":t.lineWidth},layout:{visibility:t.visible?"visible":"none"}}),this.addMapInteractions(e,t)},async fetchCsvData(e,t){const n=await k.gyn(e),i={};return n.forEach((e=>{const n="municipalities"===t?e.comuMerged:e.COUNTY;i[n]={column2:e.column2,column3:e.column3,units:e.units}})),i},createDetailedHousingDataButton(e,t){const n=document.createElement("button");return n.type="button",n.classList.add("btn","mt-2","btn-primary","btn-sm"),n.textContent="Detailed Housing Data",n.addEventListener("click",(()=>this.openHousingDataModal(e,t))),n},async openHousingDataModal(e,t){this.$emit("open-housing-data-modal",{municipalityName:e,comuMerged:t,items:[]})},getPopupContent(e,t){if("states"===e){const n=t.COUNTY_LABEL,i=this.csvDataLookup[e][t.COUNTY],o=document.createElement("div");if(o.innerHTML=`<strong>${n}</strong>`,i){if(i.column2){const e=document.createElement("div");e.innerHTML=`Column 2: ${i.column2}`,o.appendChild(e)}if(i.column3){const e=document.createElement("div");e.innerHTML=`Column 3: ${i.column3}`,o.appendChild(e)}}return o}if("municipalities"===e){const n=t.NAME,i=this.csvDataLookup[e][t.MUN_CODE],o=document.createElement("div");if(o.innerHTML=`<strong>${n}</strong>`,i&&i.units){const e=document.createElement("div");e.innerHTML=`Units: ${i.units}`,o.appendChild(e)}const a=this.createDetailedHousingDataButton(n,t.MUN_CODE);return o.appendChild(a),o}},addMapInteractions(e,t){const n=t.id,i=this.layers.find((e=>e.id===n));if("municipalities"===n){const t=["match",["get","MUN_CODE"],...Object.entries(this.csvDataLookup[n]).flatMap((([e,t])=>[e,this.getFillColor(t.units)])),"rgba(0, 0, 0, 0)"];e.setPaintProperty(`${n}-layer`,"fill-color",t)}e.on("click",`${n}-layer`,(t=>{if(!i.visible)return;const o=t.features[0].properties,a=this.getPopupContent(n,o);this.currentPopup&&this.currentPopup.remove(),this.currentPopup=(new(x().Popup)).setLngLat(t.lngLat).setDOMContent(a).addTo(e);const l=a.querySelector("button");l&&l.addEventListener("click",(()=>{this.$emit("open-housing-data-modal",{municipalityName:o.NAME,munCode:o.MUN_CODE})}))})),e.on("mouseenter",`${n}-layer`,(()=>{e.getCanvas().style.cursor="pointer"})),e.on("mouseleave",`${n}-layer`,(()=>{e.getCanvas().style.cursor=""}))},showMunicipalitiesLayer(){const e="municipalities";this.layers.forEach((t=>{t.visible=t.id===e;const n=t.visible?"visible":"none";this.map.setLayoutProperty(`${t.id}-layer`,"visibility",n),this.map.setLayoutProperty(`${t.id}-outline`,"visibility",n)})),this.currentPopup&&this.currentPopup.remove(),this.addMapInteractions(this.map,e)},showCountiesLayer(){const e="states";this.layers.forEach((t=>{t.visible=t.id===e;const n=t.visible?"visible":"none";this.map.setLayoutProperty(`${t.id}-layer`,"visibility",n),this.map.setLayoutProperty(`${t.id}-outline`,"visibility",n)})),this.currentPopup&&this.currentPopup.remove(),this.addMapInteractions(this.map,e)}}};const $=(0,f.Z)(L,[["render",D]]);var P=$,I=n(7139);const O={class:"map-overlay d-flex justify-content-center align-items-center"},T={class:"container-fluid px-0"},H={class:"row h-100"},W={class:""},E={class:"p-4 bg-white rounded w-100"},N={class:"mb-4"},U={class:"fs-4"};function j(e,t,n,i,a,l){return(0,o.wg)(),(0,o.iD)("div",O,[(0,o._)("div",T,[(0,o._)("div",H,[(0,o._)("div",W,[(0,o._)("div",E,[(0,o._)("h1",N,(0,I.zw)(n.title),1),(0,o._)("p",U,(0,I.zw)(n.content),1)])])])])])}var z={name:"MapOverlay",props:{title:{type:String,default:""},content:{type:String,default:""}}};const A=(0,f.Z)(z,[["render",j]]);var F=A;const J=e=>((0,o.dD)("data-v-e58be832"),e=e(),(0,o.Cn)(),e),Y={id:"housingDataModal",class:"modal fade",ref:"modal",tabindex:"-1",role:"dialog","aria-hidden":"true"},Z={class:"modal-dialog modal-wide",role:"document"},B={class:"modal-content"},K={class:"modal-header"},Q={class:"modal-title"},G=J((()=>(0,o._)("span",{"aria-hidden":"true"},"×",-1))),q=[G],R={class:"modal-body sticky-padding-fix"},V=J((()=>(0,o._)("h1",null,"test title",-1))),X={class:"table table-responsive table-sticky-header"};function ee(e,t,n,i,a,l){return(0,o.wg)(),(0,o.iD)("div",Y,[(0,o._)("div",Z,[(0,o._)("div",B,[(0,o._)("div",K,[(0,o._)("h5",Q,(0,I.zw)(a.modalTitle),1),(0,o._)("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",onClick:t[0]||(t[0]=(...e)=>l.hideModal&&l.hideModal(...e))},q)]),(0,o._)("div",R,[V,(0,o._)("table",X,[(0,o._)("thead",null,[(0,o._)("tr",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.fields,(e=>((0,o.wg)(),(0,o.iD)("th",{key:e.key},(0,I.zw)(e.label),1)))),128))])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(a.localItems,((e,t)=>((0,o.wg)(),(0,o.iD)("tr",{key:t},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.fields,(t=>((0,o.wg)(),(0,o.iD)("td",{key:t.key},(0,I.zw)(e[t.key]),1)))),128))])))),128))])])])])])],512)}var te={name:"HousingDataModal",props:{fields:Array},data(){return{modalTitle:"",localItems:[]}},methods:{showModal(){this.$emit("disable-scrolling"),this.$nextTick((()=>{const e=window.jQuery("#housingDataModal");e.modal("show"),document.body.style.overflow="hidden",document.body.classList.add("modal-open")}))},hideModal(){const e=window.jQuery(this.$refs.modal);document.body.style.overflow="",document.body.classList.remove("modal-open"),this.$emit("enable-scrolling"),e.modal("hide")},updateItems(e){console.log("updating modal items:",e),this.localItems=e}}};const ne=(0,f.Z)(te,[["render",ee],["__scopeId","data-v-e58be832"]]);var ie=ne,oe={name:"App",components:{FullPageWrapper:v,FullPageSection:M,MapboxMap:P,HousingDataModal:ie,MapOverlay:F},data(){return{modalTitle:"",modalFields:[],modalItems:[]}},methods:{async handleHousingDataModal({municipalityName:e,munCode:t}){this.$refs.housingDataModal.modalTitle=e;const n="/affordable-housing-viz-2/",i=await k.gyn(`${n}/data-csvs/Municipal-level-housing-data.csv`),o=i.filter((e=>e.comuMerged===t));this.modalFields=[{key:"development / aka",label:"Development"},{key:"units",label:"Units"},{key:"type",label:"Type"},{key:"agent",label:"Agent"},{key:"agent address",label:"Agent Address"},{key:"website",label:"Website"},{key:"source",label:"Source"},{key:"zip",label:"ZIP"},{key:"combinedPhone",label:"Phone"}],this.$refs.housingDataModal.updateItems(o),this.$refs.housingDataModal.showModal()}}};const ae=(0,f.Z)(oe,[["render",u]]);var le=ae;n(6744);(0,i.ri)(le).mount("#app")}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,a){if(!i){var l=1/0;for(u=0;u<e.length;u++){i=e[u][0],o=e[u][1],a=e[u][2];for(var s=!0,r=0;r<i.length;r++)(!1&a||l>=a)&&Object.keys(n.O).every((function(e){return n.O[e](i[r])}))?i.splice(r--,1):(s=!1,a<l&&(l=a));if(s){e.splice(u--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[i,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,a,l=i[0],s=i[1],r=i[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(r)var u=r(n)}for(t&&t(i);d<l.length;d++)a=l[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},i=self["webpackChunkhousing_viz_prj"]=self["webpackChunkhousing_viz_prj"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(1633)}));i=n.O(i)})();
//# sourceMappingURL=app.8882bc00.js.map