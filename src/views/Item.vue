<template>
  <div>
    <div v-if="currentItem">
      <manage-panel
        :state="state"
        @custom-cancel="callCancel"
        @custom-edit="callEdit"
        @custom-reset="callReset"
        @custom-save="callSave"
        @custom-undo="callUndo"
      />
      <div class="container">
        <div class="item flex flex-column justify-start align-start">
          <form
            ref="firstPartOfForm"
            class="item__title font-xx-large flex"
            @submit.prevent="submitFirstForm"
          >
            <custom-switcher :status="!state.isEdited">
              <div slot="option1">
                {{ originalItem.name }}&nbsp;<span slot="option1" class="black">
                #{{ originalItem.vendorCode }}
              </span>
              </div>
              <div slot="option2" class="form__group field">
                <label :for="`item-name`" class="form__label">Name</label>
                <input
                  :id="`item-name`"
                  v-model="currentItem.name"
                  :required="true"
                  :type="'text'"
                  class="form__field"
                >
              </div>
            </custom-switcher>
            <custom-switcher :status="!state.isEdited">
              <span slot="option1"></span>
              <div slot="option2" class="form__group field">
                <label :for="`item-name-vendor-code`" class="form__label">Vendor Code</label>
                <input
                  :id="`item-name-vendor-code`"
                  v-model="currentItem.vendorCode"
                  :required="true"
                  :type="'text'"
                  class="form__field"
                >
              </div>
            </custom-switcher>
          </form>
          <div
            class="item__content flex justify-between align-start flex-wrap"
          >
            <form
              ref="secondPartOfForm"
              class="content__main-props flex flex-column m-t1"
              @submit.prevent="submitSecondForm"
            >
              <div class="main-props__item flex justify-between align-center m-b-half">
                <div class="item__label">
                  Made by
                </div>
                <custom-switcher :status="!state.isEdited">
                  <div slot="option1">
                    {{ originalItem.manufacturer }}
                  </div>
                  <div slot="option2" class="form__group field">
                    <label :for="`item-manufacturer`" class="form__label">Manufacturer</label>
                    <input
                      :id="`item-manufacturer`"
                      v-model="currentItem.manufacturer"
                      :required="true"
                      :type="'text'"
                      class="form__field"
                    >
                  </div>
                </custom-switcher>
              </div>
              <div class="main-props__item flex justify-between align-center m-b-half">
                <div class="item__label">
                  Available pieces
                </div>
                <custom-switcher :status="!state.isEdited">
                  <div slot="option1">
                    {{ originalItem.count }}
                  </div>
                  <div slot="option2" class="form__group field">
                    <label :for="`item-count`" class="form__label">Count</label>
                    <input
                      :id="`item-count`"
                      v-model="currentItem.count"
                      :min="0"
                      :required="true"
                      :type="'number'"
                      class="form__field"
                    >
                  </div>
                </custom-switcher>
              </div>
              <div class="main-props__item flex justify-between align-center m-b-half">
                <div class="item__label">
                  Cost
                </div>
                <custom-switcher :status="!state.isEdited">
                  <div slot="option1">
                    {{ originalItem.price }}$
                  </div>
                  <div slot="option2" class="form__group field">
                    <label :for="`item-price`" class="form__label">Price in $</label>
                    <input
                      :id="`item-price`"
                      v-model="currentItem.price"
                      :min="0"
                      :required="true"
                      :type="'number'"
                      class="form__field"
                    >
                  </div>
                </custom-switcher>
              </div>
            </form>
            <div
              v-if="Object.keys(originalAdditionalFields).length > 0 && !state.isEdited"
              class="content__additional-props flex flex-column m-t1"
            >
              <div class="font-larger m-b-half">Additional Fields</div>
              <div
                v-for="(field) in originalAdditionalFields"
                :key="field.id"
                class="flex justify-between box-border m-b-half"
              >
                <div class="item__label m-r1">
                  {{ field.name }}
                </div>
                <div>
                  {{ field.value }}
                </div>
              </div>
            </div>
            <div
              v-else-if="state.isEdited"
              class="content__additional-props flex flex-column m-t1"
            >
              <div class="font-larger m-b-half">Additional Fields</div>
              <form ref="thirdPartOfForm" @submit.prevent="submitThirdForm">
                <div
                  v-for="(field, id) in additionalFields"
                  :key="id"
                  class="flex justify-between align-center box-border m-b-half"
                >
                  <div class="item__label m-r1">
                    <div slot="option2" class="form__group field">
                      <label
                        :for="`additional-field-${id + field.name}`"
                        class="form__label"
                      >
                        Name
                      </label>
                      <input
                        :id="`additional-field-${id + field.name}`"
                        v-model="field.name"
                        :required="true"
                        :type="'text'"
                        class="form__field"
                      >
                    </div>
                  </div>
                  <div>
                    <div slot="option2" class="form__group field">
                      <label
                        :for="`additional-field-${id + field.name}`"
                        class="form__label"
                      >
                        Value
                      </label>
                      <input
                        :id="`additional-field-${id + field.name}`"
                        v-model="field.value"
                        :required="true"
                        :type="'text'"
                        class="form__field"
                      >
                    </div>
                  </div>
                  <div class="button button_error"
                       @click="removeNewAdditionalField(field, id)">
                    <v-icon class="fill-red" name="trash"/>
                  </div>
                </div>
              </form>
              <hr v-if="state.isEdited && Object.keys(additionalFields).length > 0"
                  class="m-b1 m-t1">
              <div v-if="state.isEdited">
                <div class="m-l-half font-larger">Insert new field</div>
                <form
                  ref="newAdditionalField"
                  class="flex align-center"
                  @submit.prevent="submitFormAdditionalField"
                >
                  <div slot="option2" class="form__group field">
                    <label :for="`additional-field-name`" class="form__label">Name</label>
                    <input
                      :id="`additional-field-name`"
                      v-model="additionalField.name"
                      :required="true"
                      :type="'text'"
                      class="form__field"
                    >
                  </div>
                  <div slot="option2" class="form__group field">
                    <label :for="`additional-field-value`" class="form__label">Value</label>
                    <input
                      :id="`additional-field-value`"
                      v-model="additionalField.value"
                      :required="true"
                      :type="'text'"
                      class="form__field"
                    >
                  </div>
                  <div
                    class="button button_success m-r-half m-l-half"
                    @click="saveNewAdditionalField"
                  >
                    Save
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-column justify-center align-center">
      <div class="m-b1">Nothing Found</div>
      <router-link to="/">
        <div class="button button_primary">
          Go Home
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import _ from 'lodash';
import ManagePanel from '../components/ItemManagePanel.vue';
import DialogModal from '../components/base/DialogModal.vue';

export default {
  name: 'CatalogItem',
  data() {
    return {
      originalItem: null,
      currentItem: null,
      originalAdditionalFields: null,
      additionalFields: null,
      state: {
        isEdited: false,
        isModified: false,
        canUndo: false,
      },
      additionalField: {
        name: '',
        value: '',
      },
    };
  },
  components: { ManagePanel },
  computed: {
    ...mapGetters({
      item: 'catalog/item',
    }),
  },
  methods: {
    ...mapMutations({
      selectItem: 'catalog/selectItem',
      updateItem: 'catalog/updateItem',
    }),
    saveNewAdditionalField() {
      this.$refs.newAdditionalField.requestSubmit();
    },
    removeNewAdditionalField(field, id) {
      this.$modal.show(DialogModal, {
        message: `That you want delete
        "${field.name.slice(0, 40)}${field.name.length > 40 ? '...' : ''}"?`,
        closeDialog: this.closeDialog,
        success: () => {
          this.deleteItem(id);
        },
      }, {
        width: '200px',
        height: '200px',
        name: 'remove-additional-property',
      });
    },
    closeDialog() {
      this.$modal.hide('remove-additional-property');
    },
    deleteItem(id) {
      delete this.additionalFields[id];
      this.additionalFields = _.cloneDeep(this.additionalFields);
    },
    submitFirstForm() {
      this.$refs.secondPartOfForm.requestSubmit();
    },
    submitSecondForm() {
      this.$refs.thirdPartOfForm.requestSubmit();
    },
    submitThirdForm() {
      this.saveUpdatedModel();
    },
    submitFormAdditionalField() {
      this.currentItem.lastAdditionalIndex += 1;
      this.additionalFields[this.currentItem.lastAdditionalIndex] = this.additionalField;
      this.additionalFields = _.cloneDeep(this.additionalFields);
      this.additionalField.name = '';
      this.additionalField.value = '';
    },
    callEdit() {
      this.state.isEdited = true;
      this.state.isModified = false;
    },
    callReset() {
      this.currentItem = _.cloneDeep(this.originalItem);
      this.additionalFields = _.cloneDeep(this.originalAdditionalFields);
      this.state.isModified = false;
    },
    callCancel() {
      this.state.isEdited = false;
      this.state.isModified = false;
      this.originalItem = _.cloneDeep(this.item);
      this.currentItem = _.cloneDeep(this.item);
      this.originalAdditionalFields = _.cloneDeep(this.item.additionalFields);
      this.additionalFields = _.cloneDeep(this.item.additionalFields);
    },
    callSave() {
      this.$refs.firstPartOfForm.requestSubmit();
    },
    saveUpdatedModel() {
      this.updateItem(this.prepareItem());
      this.state.isEdited = false;
      this.state.isModified = false;
    },
    callUndo() {
      this.updateItem(this.currentItem.backState);
      this.state.isModified = false;
    },
    prepareItem() {
      return {
        ...this.currentItem,
        additionalFields: {
          ...this.additionalFields,
        },
      };
    },
  },
  watch: {
    item: {
      handler(item) {
        this.state.canUndo = !!item.backState;

        this.currentItem = _.cloneDeep(item);
        this.additionalFields = _.cloneDeep(item.additionalFields);
        if (!this.state.isEdited) {
          this.originalItem = _.cloneDeep(item);
          this.originalAdditionalFields = _.cloneDeep(item.additionalFields);
        }
      },
      deep: true,
    },
    currentItem: {
      handler(value) {
        if (
          (this.state.isEdited && !_.isEqual(value, this.item))
          && (!_.isEqual(value, this.item.backState))
        ) {
          this.state.isModified = true;
        }
      },
      deep: true,
    },
    additionalFields: {
      handler(value) {
        if (
          (this.state.isEdited && !_.isEqual(value, this.item.additionalFields))
          && (!_.isEqual(value, this.originalAdditionalFields))
          && (
            this.item.backState && !_.isEmpty(this.item.backState.additionalFields)
              ? !_.isEqual(value, this.item.backState.additionalFields)
              : true
          )
        ) {
          this.state.isModified = true;
        }
      },
      deep: true,
    },
  },
  beforeMount() {
    this.selectItem(this.$router.currentRoute.params.id);
    this.originalItem = _.cloneDeep(this.item);
    this.currentItem = _.cloneDeep(this.item);
    this.additionalFields = _.cloneDeep(this.item.additionalFields);
    this.originalAdditionalFields = _.cloneDeep(this.item.additionalFields);

    this.state.canUndo = !!this.currentItem.backState;
  },
};
</script>

<style lang="scss" scoped>

.item {
  -webkit-box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
  -moz-box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
  box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
  padding: 1em;
  text-align: start;

  .item__title {
    color: $light-blue;
    margin-bottom: 1em;
    width: 100%;
  }

  .item__content {
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;

    @include for-small-tablet-only {
      flex-direction: row;
    }

    & > form{
      width: 100vw;
      box-sizing: border-box;
      max-width: 100%;

      @include for-small-tablet-only {
        max-width: 70%;
      }

      @include for-tablet-portrait-up {
        max-width: 40%;
      }
    }

    & > form > div {
      max-width: 100%;
      width: inherit;
      font-size: larger;
    }

    & > form.content__main-props {
      padding: 0 1em;
    }

    & div.content__additional-props {
      width: auto;
      max-width: 100%;
    }
  }
}

.content__additional-props {
  -webkit-box-shadow: -3px 5px 5px 4px rgba($blue, 0.2);
  -moz-box-shadow: -3px 5px 5px 4px rgba($blue, 0.2);
  box-shadow: -3px 5px 5px 4px rgba($blue, 0.2);

  padding: 1em;
}

.item__label {
  color: rgba($gray, 0.9);
}

/* inputs */
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
  min-width: 50px;
  width: 100%;
  max-width: 300px;
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
.form__field {
  &:required, &:invalid {
    box-shadow: none;
  }
}

.field {
  padding: 0.5em;
}
</style>
