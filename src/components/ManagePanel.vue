<template>
  <div class="container p-b0">
    <div class="wrapper flex  justify-between p-l0 p-r0" :class="{
      'flex-column' : this.breakpoint === 'xs',
      'align-center' : this.breakpoint === 'xs',
      'align-end' : this.breakpoint !== 'xs',
    }">
      <div
        class="flex flex-column justify-center align-center m-r-half m-l-half m-b-half"
      >
        <div>View</div>
        <toggle
          :items="[
          {'text': 'Tile', 'value': 'tile'},
          {'text': 'List', 'value': 'list'},
        ]"
          :selected="selected"
          @change="updateViewType"
        />
      </div>
      <div
        class="button button_success m-r-half m-l-half m-b-half m-"
        :class="{
          'm-t1' : this.breakpoint === 'xs'
        }"
        @click="callModal()"
      >
        Create Item
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SET_VIEW_TYPE from '../store/types';
import CreateModal from '@/components/CreateModal.vue';

export default {
  name: 'ManagePanel',
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
    ...mapMutations({
      updateViewType: SET_VIEW_TYPE,
    }),
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
