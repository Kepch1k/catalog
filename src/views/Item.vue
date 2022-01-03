<template>
  <div class="container">
    <div class="item">
      <div class="item_title font-larger">
        {{ item.name }}
      </div>
      <div class="item_content">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CatalogItem',
  computed: {
    ...mapGetters({
      item: 'catalog/item',
    }),
  },
  methods: {
    ...mapMutations({
      selectItem: 'catalog/selectItem',
    }),
  },
  beforeMount() {
    this.selectItem(this.$router.currentRoute.params.id);
  },
};
</script>

<style scoped lang="scss">
  .item{
    -webkit-box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
    box-shadow: 0 0 5px 1px rgba(34, 60, 80, 0.2) inset;
  }

  .item_title{

  }
</style>
