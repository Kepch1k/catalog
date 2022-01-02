<template>
  <catalog-list :items="items"/>
</template>

<script>
import { mapGetters } from 'vuex';
import CatalogList from '../components/CatalogList.vue';

export default {
  name: 'List',
  components: { CatalogList },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      items: 'catalog/items',
    }),
  },
};
</script>
