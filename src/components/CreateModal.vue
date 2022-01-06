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
    <form ref="form" class="form" @submit.prevent="submitForm">
      <custom-input
        :value.sync="model.name"
        label="Name"
      />
      <custom-input
        :value.sync="model.vendorCode"
        label="Vendor Code"
      />
      <custom-input
        :value.sync="model.manufacturer"
        label="Manufacturer"
      />
      <custom-input
        :min="0"
        :value.sync="model.count"
        label="Count"
        type="number"
      />
      <custom-input
        :min="0"
        :value.sync="model.price"
        idPart="Price"
        label="Price in $"
        type="number"
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
        lastAdditionalIndex: 0,
        additionalFields: {},
      });

      this.closeDialog();
    },
    onSubmitForm() {
      this.$refs.form.requestSubmit();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: inherit;
  height: inherit;
  border: 1px solid transparent;
  margin: 0;
  box-sizing: border-box;
  background: rgba($light-gray, 0.1);

  & > div {
    width: 100%;
  }
}

.form {
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.5em;
}
</style>
