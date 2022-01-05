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
          :selected.sync="selected"
        />
      </div>
      <div
        class="button button_success m-r-half m-l-half m-b-half m-"
        :class="{
          'm-t1' : this.breakpoint === 'xs'
        }"
      >
        Create Item
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SET_VIEW_TYPE from '../store/types';

export default {
  name: 'ManagePanel',
  data() {
    return {
      selected: this.viewType,
    };
  },
  computed: {
    ...mapGetters({
      viewType: 'viewType',
      breakpoint: 'breakpoint',
    }),
  },
  methods: {
    ...mapMutations({
      updateViewType: SET_VIEW_TYPE,
    }),
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
