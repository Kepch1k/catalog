<template>
  <div>
    <slot v-if="status" name="option1"/>
    <slot v-else name="option2"/>
  </div>
</template>

<script>
export default {
  props: {
    status: Boolean,
  },
  name: 'CustomSwitcher',
};
</script>
