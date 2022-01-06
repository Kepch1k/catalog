<template>
  <div class="container">
    <div v-if="items.length === 0">Empty</div>
    <div
      :class="{
        'list' : viewType === 'list',
        'tile' : viewType === 'tile',
      }"
    >
      <catalog-item
        v-for="item in items"
        :itemData="item"
        :key="item['id']"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CatalogItem from './CatalogItem.vue';

export default {
  props: {
    items: Array,
  },
  name: 'CatalogList',
  components: { CatalogItem },
  computed: {
    ...mapGetters({
      viewType: 'viewType',
    }),
  },
};
</script>

<style scoped lang="scss">
  .list{
    display: grid;
    grid-template-columns: 1fr;
  }

  .tile{
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include for-phone-only {
      grid-template-columns: repeat(1, 1fr);
    }

    @include for-small-tablet-only {
      grid-template-columns: repeat(1, 1fr);
    }

    @include for-tablet-portrait-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include for-tablet-landscape-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include for-desktop-up {
      grid-template-columns: repeat(3, 1fr);
    }

    @include for-big-desktop-up {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
