<template>
  <div class="container">{{ item.name }}</div>
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
  mounted() {
    // console.log(this.$store);
    // console.log(this.$router.currentRoute.params.id);
  },
};
</script>

<style scoped lang="scss">
  .wrapper{
    border: 1px solid $black;
    border-radius: 5px;
    padding: 1em;
    margin: 5px;
  }
</style>
