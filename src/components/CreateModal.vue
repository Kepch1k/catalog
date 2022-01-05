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
      <div class="form__group field">
        <label for="create-item-name" class="form__label">Name</label>
        <input v-model="model.name" class="form__field" type="text" id="create-item-name" required>
      </div>
      <div class="form__group field">
        <label for="create-item-vendor-code" class="form__label">Vendor Code</label>
        <input v-model="model.vendorCode"
               class="form__field" type="text" id="create-item-vendor-code" required>
      </div>
      <div class="form__group field">
        <label for="create-item-manufacturer" class="form__label">Manufacturer</label>
        <input v-model="model.manufacturer"
               class="form__field" type="text" id="create-item-manufacturer" required>
      </div>
      <div class="form__group field">
        <label for="create-item-count" class="form__label">Count</label>
        <input v-model="model.count"
               class="form__field" type="number" min="0" id="create-item-count" required>
      </div>
      <div class="form__group field">
        <label for="create-item-price" class="form__label">Price in $</label>
        <input
          v-model="model.price"
          class="form__field"
          type="number"
          min=0
          id="create-item-price"
          required
        >
      </div>
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

  & > .field{
    padding: 0.5em;
  }
}

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: auto;
  max-width: 80%;
}

.form__field {
  margin-top: 0.5em;
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
  font-weight: 700;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $blue;
  }
  padding-bottom: 6px;
  border-width: 3px;
  border-image: linear-gradient(to right, $blue, $light-blue);
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}
</style>
