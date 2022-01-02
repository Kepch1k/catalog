<template>
  <footer>
    <div class="container">
      &copy; {{ new Date().getFullYear() }} Catalog. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
};
</script>

<style scoped lang="scss">
  footer{
    background: $gray;
    color: $white;
  }
</style>
