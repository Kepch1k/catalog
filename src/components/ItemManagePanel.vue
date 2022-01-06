<template>
  <div class="container p-b0">
    <div class="wrapper flex justify-between p-l0 p-r0 font-larger" :class="{
      'flex-column' : this.breakpoint === 'xs' || this.breakpoint === 'sm',
      'align-center' : this.breakpoint === 'xs' || this.breakpoint === 'sm',
      'align-end' : this.breakpoint !== 'xs' && this.breakpoint !== 'sm',
    }">
      <div
        class="flex justify-center align-center m-r-half m-l-half m-b-half"
      >
        <div
          v-if="state.isEdited"
          class="button button_primary m-r-half m-l-half m-b-half"
          :class="{
          'm-t1' : this.breakpoint === 'xs',
          'button_disabled' : !state.canUndo,
        }"
          @click="$emit('custom-undo')"
        >
          <v-icon
            scale="1"
            name="undo"
            class="fill-blue"
          />
        </div>
      </div>
      <div
        class="flex justify-center align-center m-r-half m-l-half m-b-half"
      >
        <div
          v-if="state.isEdited"
          class="button button_success m-r-half m-l-half m-b-half"
          :class="{
          'm-t1' : this.breakpoint === 'xs',
          'button_disabled' : !state.isModified,
        }"
          @click="$emit('custom-save')"
        >
          Save
        </div>
        <div
          v-if="!state.isEdited"
          class="button button_warning m-r-half m-l-half m-b-half"
          :class="{
          'm-t1' : this.breakpoint === 'xs'
        }"
          @click="$emit('custom-edit')"
        >
          Edit
        </div>
        <div
          v-if="state.isEdited"
          class="button button_error m-r-half m-l-half m-b-half"
          :class="{
          'm-t1' : this.breakpoint === 'xs',
          'button_disabled' : !state.isModified,
        }"
          @click="$emit('custom-reset')"
        >
          Reset
        </div>
        <div
          v-if="state.isEdited"
          class="button button_primary m-r-half m-l-half m-b-half"
          :class="{
          'm-t1' : this.breakpoint === 'xs'
        }"
          @click="$emit('custom-cancel')"
        >
          <v-icon
            scale="1"
            name="times"
            class="fill-red"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateModal from '@/components/CreateModal.vue';

export default {
  name: 'ItemManagePanel',
  props: {
    state: Object,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      viewType: 'viewType',
      breakpoint: 'breakpoint',
    }),
    selected() {
      return this.viewType;
    },
  },
  methods: {
    callModal() {
      this.$modal.show(CreateModal, {
        message: `That you want delete
        ""?`,
        closeDialog: this.closeModal,
        success: this.deleteItem,
      }, {
        width: '600px',
        height: '350px',
        name: 'create-modal',
      });
    },
    closeModal() {
      this.$modal.hide('create-modal');
    },
  },
  watch: {
    selected(v) {
      this.updateViewType(v);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
