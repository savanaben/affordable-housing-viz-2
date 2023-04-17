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
      // Add your fullPage.js options here
      onLeave: (origin, destination, direction) => {
        this.$emit('onLeave', origin, destination, direction);
      },
    });
  });
},

beforeUnmount() {
  if (this.fullpageInstance) {
    this.fullpageInstance.destroy('all');
  }
},



  methods: {
disableScrolling() {
    if (this.fullpageInstance) {
      this.fullpageInstance.setAllowScrolling(false);
      this.fullpageInstance.setKeyboardScrolling(false);
    }
  },
  enableScrolling() {
    if (this.fullpageInstance) {
      this.fullpageInstance.setAllowScrolling(true);
      this.fullpageInstance.setKeyboardScrolling(true);
    }
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the fullPage.js wrapper here */
</style>
