<template>
  <div class="container flex flex-column justify-between align-center wrapper">
    <div class="m-b1 flex justify-between align-center">
      <div>
        <b class="font-larger">
          Creation of new item
        </b>
      </div>
      <div class="button button_error" @click="closeDialog">Close</div>
    </div>
    <form class="form" @submit.prevent="submitForm" ref="form">
      <custom-input
        label="Name"
        :value.sync="model.name"
      />
      <custom-input
        label="Vendor Code"
        :value.sync="model.vendorCode"
      />
      <custom-input
        label="Manufacturer"
        :value.sync="model.manufacturer"
      />
      <custom-input
        label="Count"
        :value.sync="model.count"
        type="number"
        :min="0"
      />
      <custom-input
        label="Price in $"
        idPart="Price"
        :value.sync="model.price"
        type="number"
        :min="0"
      />
    </form>
    <div>
      <div class="button button_success m-r-half" @click="onSubmitForm()">Save</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    message: String,
    closeDialog: Function,
    success: Function,
  },
  name: 'CreateModal',
  data() {
    return {
      model: {
        name: '',
        vendorCode: '',
        manufacturer: '',
        count: 0,
        price: 0,
      },
    };
  },
  methods: {
    ...mapMutations({
      addCatalogItem: 'catalog/addItem',
    }),
    submitForm() {
      this.addCatalogItem({
        vendorCode: this.model.vendorCode,
        name: this.model.name,
        count: this.model.count,
        price: this.model.price,
        manufacturer: this.model.manufacturer,
        additionalFields: [],
      });

      this.closeDialog();
    },
    onSubmitForm() {
      this.$refs.form.requestSubmit();
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper{
  width: inherit;
  height: inherit;
  border: 1px solid transparent;
  margin: 0;
  box-sizing: border-box;
  background: rgba($light-gray, 0.1);

  & > div{
    width: 100%;
  }
}

.form{
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.5em;
}
</style>
