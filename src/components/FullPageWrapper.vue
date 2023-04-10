<!-- FullPageWrapper.vue -->
<template>
  <div id="fullpage" ref="fullPageWrapper" @disable-scrolling="disableScrolling" @enable-scrolling="enableScrolling">

    <slot></slot>
  </div>
</template>

<script>
import 'fullpage.js/dist/fullpage.min.css';
import fullpage from 'fullpage.js';

export default {
  name: 'FullPageWrapper',
  data() {
    return {
      fullpageInstance: null,
    };
  },
  async mounted() {
  await this.$nextTick();
  this.fullpageInstance = new fullpage('#fullpage', {
    // Add your fullPage.js options here
  });
},
  methods: {
    disableScrolling() {
      if (this.fullpageInstance) {
        this.fullpageInstance.setAllowScrolling(false);
      }
    },
    enableScrolling() {
      if (this.fullpageInstance) {
        this.fullpageInstance.setAllowScrolling(true);
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the fullPage.js wrapper here */
</style>
