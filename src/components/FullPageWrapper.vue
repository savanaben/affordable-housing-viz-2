<!-- FullPageWrapper.vue -->
<template>
  <div id="fullpage">
    <slot></slot>
  </div>
</template>

<script>
import 'fullpage.js/dist/fullpage.min.css';
import fullpage from 'fullpage.js';

export default {
  name: 'FullPageWrapper',
  mounted() {
    new fullpage('#fullpage', {
      // Add your fullPage.js options here
    });
  },
};
</script>

<style scoped>
/* Add any styles specific to the fullPage.js wrapper here */
</style>