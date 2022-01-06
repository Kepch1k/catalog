<template>
  <manage-panel>
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
      :class="{
          'm-t1' : this.breakpoint === 'xs'
        }"
      class="button button_success m-r-half m-l-half m-b-half"
      @click="callModal()"
    >
      Create Item
    </div>
  </manage-panel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreateModal from '@/components/CreateModal.vue';

export default {
  name: 'ListManagePanel',
  data() {
    return {};
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
      updateViewType: 'setViewType',
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
