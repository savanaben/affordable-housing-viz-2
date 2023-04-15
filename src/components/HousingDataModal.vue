<!-- HousingDataModal.vue -->
<template>
    <div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th v-for="field in fields" :key="field.key">{{ field.label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
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
  export default {
    name: 'HousingDataModal',
    props: {
      title: String,
      fields: Array,
      items: Array,
    },
    
    
    
    methods: {

      openHousingDataModal(data) {
    this.housingData = data;
    $(this.$refs.housingDataModal).modal('show');
  },


      showModal() {
    // Replace the jQuery syntax with vanilla JavaScript and Vue ref
    this.$refs.modal.classList.add('show');
    this.$refs.modal.style.display = 'block';
    document.body.classList.add('modal-open');
  },
  hideModal() {
    // Replace the jQuery syntax with vanilla JavaScript and Vue ref
    this.$refs.modal.classList.remove('show');
    this.$refs.modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  },
    },
  };
  </script>
  