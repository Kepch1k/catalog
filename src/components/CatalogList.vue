<template>
  <div class="container">
    <div class="list">
      <catalog-item v-for="item in items" :itemData="item" :key="item['vendorCode']"/>
    </div>
  </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue';

export default {
  props: {
    items: Array,
  },
  name: 'CatalogList',
  components: { CatalogItem },
};
</script>

<style scoped lang="scss">
  .list{
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @include for-phone-only {
      grid-template-columns: repeat(1, 1fr);
    }

    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include for-tablet-landscape-up {
      grid-template-columns: repeat(3, 1fr);
    }

    @include for-desktop-up {
      grid-template-columns: repeat(4, 1fr);
    }

    @include for-big-desktop-up {
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>
