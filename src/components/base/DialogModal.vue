<template>
  <div class="container flex flex-column justify-center align-center wrapper">
    <div class="m-b1">
      <b>
        Are you sure?
      </b>
    </div>
    <div v-if="message" class="m-b1">{{ message }}</div>
    <div class="flex">
      <div class="button button_success m-r-half" @click="success(); closeDialog();">Yes</div>
      <div class="button button_error" @click="closeDialog">No</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    closeDialog: Function,
    success: Function,
  },
  name: 'DialogModal',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0;
  height: inherit;
  border: 1px solid transparent;
}
</style>
