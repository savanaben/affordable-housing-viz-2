<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container-fluid px-0">
      <div class="row h-100">
        <div class="">
          <div class="p-4 bg-white rounded w-100">
            <h1 class="mb-3" v-if="title" v-html="title"></h1>
            <p class="fs-4 mb-0" v-if="content" v-html="content"></p>
            <slot></slot>
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
  