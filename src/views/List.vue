<template>
  <div>
    <manage-panel/>
    <catalog-list :items="items"/>
    <pagination/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CatalogList from '../components/CatalogList.vue';
import Pagination from '../components/Pagination.vue';
import ManagePanel from '../components/ManagePanel.vue';

export default {
  name: 'List',
  components: { ManagePanel, Pagination, CatalogList },
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
