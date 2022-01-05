<template>
  <div class="wrapper">
    <div class="item">
      <router-link
        class="svg-wrapper"
        :to="`/product/${itemData['id']}`"
      >
        <div class="item__header font-larger">
          {{ itemData['name'] }} #{{ itemData['vendorCode'] }}
        </div>
      </router-link>
      <div class="item__content flex justify-around flex-wrap">
        <div class="content__left-side flex flex-column justify-around align-start flex-wrap">
          <div class="content__field p-b0">
            {{ itemData['price'] }}<span class="opacity-50">$</span>
          </div>
          <div
            :class="[
            'content__field',
            'font-smaller',
            'p-t0',
            +itemData['count'] >= 1 ? 'content__field_color_green' : 'content__field_color_red'
          ]"
          >
            Available {{ itemData['count'] }} pc{{ +itemData['count'] > 1 ? 's' : '' }}.
          </div>
        </div>
        <div class="content__right-side flex">
          <router-link
            class="svg-wrapper"
            :to="`/product/${itemData['id']}`"
          >
            <div class="button button_primary m-r-half">
              Show
            </div>
          </router-link>
          <div
            class="button button_error m-l-half"
            @click="callDialog()"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import DialogModal from './base/DialogModal.vue';

export default {
  props: {
    itemData: Object,
  },
  name: 'CatalogItem',
  methods: {
    ...mapMutations({
      deleteCatalogItem: 'catalog/deleteItem',
    }),
    callDialog() {
      this.$modal.show(DialogModal, {
        message: `That you want delete
        "${this.itemData.name.slice(0, 40)}${this.itemData.name.length > 40 ? '...' : ''}"?`,
        closeDialog: this.closeDialog,
        success: this.deleteItem,
      }, {
        width: '200px',
        height: '200px',
        name: this.itemData.id.toString(),
      });
    },
    closeDialog() {
      this.$modal.hide(this.itemData.id.toString());
    },
    deleteItem() {
      this.deleteCatalogItem(this.itemData.id);
    },
  },
};
</script>

<style scoped lang="scss">
  .wrapper{
    border: 1px solid $light-gray;
    border-radius: 5px;
    margin: 5px;

    &:hover{
      //transform: scale(1.02);
      background: rgba($light-gray, 0.1);
    }
  }

  .item__header{
    padding: .5em 1em;
  }

  .item__content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: .5em;
  }

  .content__field{
    padding: 5px;
    margin: 0 5px;
  }

  .content__field_color_green{
    color: $green;
  }

  .content__field_color_red{
    color: $red;
  }
</style>
