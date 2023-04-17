<template>
    <div class="map-overlay d-flex justify-content-center align-items-center">
      <div class="container-fluid px-0">
        <div class="row h-100">
          <div class="">
            <div class="p-4 bg-white rounded w-100">
              <h1 class="mb-4">{{ title }}</h1>
              <p class="fs-4">{{ content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapOverlay',
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    }
  };
  </script>

<style>
/* ... */
h1 {
  font-family: 'Lora', serif;
  font-weight: 900;
}
/* ... */
</style>
  