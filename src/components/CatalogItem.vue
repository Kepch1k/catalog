<template>
  <div class="wrapper">
    <div class="item">
      <router-link
        class="svg-wrapper"
        :to="`/${itemData['vendorCode']}`"
      >
        <div class="item__header">
          {{ itemData['name'] }} ({{ itemData['vendorCode'] }})
        </div>
      </router-link>
      <div class="item__content">
        {{  }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: Object,
  },
  name: 'CatalogItem',
};
</script>

<style scoped lang="scss">
  .wrapper{
    border: 1px solid $black;
    border-radius: 5px;
    padding: 1em;
    margin: 5px;
  }

  a{
    text-decoration: none;
  }
</style>
