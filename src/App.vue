<template>
  <div id="app">
    <site-header/>
    <router-view/>
    <modals-container/>
    <site-footer/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapMutations({
      updateBreakpoint: 'updateBreakpoint',
    }),
  },
  created() {
    window.addEventListener('resize', this.updateBreakpoint);
    this.updateBreakpoint();
  },
  destroyed() {
    window.removeEventListener('resize', this.updateBreakpoint);
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
