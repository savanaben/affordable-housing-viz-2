<template>
  <div id="housingDataModal" class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-wide" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">{{ modalTitle }}</h1>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body sticky-padding-fix">
          <h4 class="pt-4 pb-2">The following housing data is from the NJ Division of Codes and Standards 2022 List of <a href="https://www.nj.gov/dca/divisions/codes/publications/developments.html" target="_blank">Affordable Developments by County</a>. 
          </h4>
          <table class="table table-responsive table-sticky-header">
            <thead>
              <tr>
                <th v-for="field in fields" :key="field.key">{{ field.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in localItems" :key="index">
                <td v-for="field in fields" :key="field.key">{{ item[field.key] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
export default {
  name: 'HousingDataModal',
  props: {
    fields: Array,
  },

  data() {
    return {
      modalTitle: '',
      localItems: [],
    };
  },

  methods: {
  showModal() {
  this.$emit('disable-scrolling');
  this.$nextTick(() => {
    const modalElement = window.jQuery('#housingDataModal');
    modalElement.modal('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  });
},

hideModal() {
  const modalElement = window.jQuery(this.$refs.modal);
  document.body.style.overflow = '';
  document.body.classList.remove('modal-open');
  this.$emit('enable-scrolling');
  modalElement.modal('hide');
},

    updateItems(items) {
      console.log('updating modal items:', items);
      this.localItems = items;
    },
  },
};
</script>


<style scoped>
.modal-wide {
  max-width: 90%;
}

.modal-body {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

.table-sticky-header thead {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
}

.sticky-padding-fix{
  padding-top: 0 !important;
}

</style>
