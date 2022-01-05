<template>
  <div class="radio-wrapper flex">
    <div class="form_radio_btn" v-for="(item, index) in items" :key="item['value']">
      <input
        v-model="toggleSelected"
        @change="$emit('change', toggleSelected);"
        :id="`radio-${index}`"
        type="radio"
        name="radio"
        :value="item['value']"
      >
      <label :for="`radio-${index}`">{{ item['text'] }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    selected: String,
  },
  name: 'Toggle',
  data() {
    return {
      toggleSelected: this.selected,
    };
  },
};
</script>

<style scoped lang="scss">
.radio-wrapper{
  & .form_radio_btn:first-child > label{
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }

  & .form_radio_btn:last-child > label{
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-right-width: 1px;
  }
}

.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type=radio] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  padding: 0px 15px;
  line-height: 34px;
  border: 1px solid $light-gray;
  border-right-width: 0;
  //border-radius: 6px;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: rgba($light-blue, 0.4);
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
  background: $white;
  color: $gray;
}
</style>
