<template>
  <div id="app">
    <site-header/>
    <router-view/>
    <site-footer/>
  </div>
</template>

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
