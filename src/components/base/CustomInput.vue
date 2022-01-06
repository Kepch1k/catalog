<template>
  <div class="form__group field">
    <label :for="`create-item-${parsedLabel}`" class="form__label">{{ label }}</label>
    <input
      v-model="enteredValue"
      class="form__field"
      :type="type"
      :id="`create-item-${parsedLabel}`"
      :required="required"
      :min="min"
      @input="$emit('update:value', enteredValue);"
    >
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    idPart: {
      type: [String],
      required: false,
    },
    min: {
      type: [String, Number],
      required: false,
    },
    value: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  name: 'CustomInput',
  data() {
    return {
      enteredValue: this.value,
    };
  },
  computed: {
    parsedLabel() {
      return (this.idPart || this.label).replaceAll(/\s/g, '-').toLowerCase();
    },
  },
};
</script>

<style scoped lang="scss">
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: auto;
  max-width: 80%;
}

.form__field {
  margin-top: 0.5em;
  font-family: inherit;
  min-width: 50px;
  width: 100%;
  max-width: 300px;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
  font-weight: 700;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $blue;
  }
  padding-bottom: 6px;
  border-width: 3px;
  border-image: linear-gradient(to right, $blue, $light-blue);
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}

.field{
  padding: 0.5em;
}
</style>
