<template>
  <div class="container p-b0">
    <div :class="{
      'flex-column' : this.breakpoint === 'xs',
      'align-center' : this.breakpoint === 'xs',
      'align-end' : this.breakpoint !== 'xs',
    }" class="wrapper flex  justify-between p-l0 p-r0">
      <slot/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ManagePanel',
  computed: {
    ...mapGetters({
      breakpoint: 'breakpoint',
    }),
  },
};
</script>
