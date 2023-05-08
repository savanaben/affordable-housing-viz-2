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
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      fullpageInstance: null,
    };
  },


//   mounted() {
//   this.$nextTick(() => {
//     this.fullpageInstance = new fullpage(this.$refs.fullPageWrapper, {
//       // Add your fullPage.js options here
//     });
//   });
// },


mounted() {
  this.$nextTick(() => {
    this.fullpageInstance = new fullpage(this.$refs.fullPageWrapper, {
      ...this.options,
      onLeave: (origin, destination, direction) => {
        this.$emit('onLeave', origin, destination, direction);
      },
      afterLoad: (origin, destination, direction) => {
        this.$emit('afterLoad', origin, destination, direction);
      },
    });
  });
},


beforeUnmount() {
  if (this.fullpageInstance) {
    this.fullpageInstance.destroy('all');
  }
},





};
</script>

<style scoped>
/* Add any styles specific to the fullPage.js wrapper here */
</style>
