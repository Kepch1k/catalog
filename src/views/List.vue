<template>
  <div>
    <manage-panel/>
    <catalog-list :items="chunk || items"/>
    <div class="container p-t0">
      <paginate
        v-model="pagination.page"
        :page-count="pagination.count"
        :page-range="pagination.range"
        :margin-pages="pagination.margin"
        :click-handler="navigate"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CatalogList from '../components/CatalogList.vue';
import ManagePanel from '../components/ManagePanel.vue';

export default {
  name: 'List',
  components: { ManagePanel, CatalogList },
  data() {
    return {
      pagination: {
        page: 10,
        range: 1,
        count: 20,
        margin: 1,
        pageSize: 1,
      },
    };
  },
  methods: {
    ...mapMutations({
      pickChunk: 'catalog/pickChunk',
    }),
    navigate(page) {
      this.pickChunk({ page, chunkSize: this.pagination.pageSize });
    },
    updatePaginationConfig(breakpoint) {
      const { items: { length }, viewType } = this;
      let chunkBy = null;

      switch (breakpoint) {
        case 'xs': {
          this.pagination.range = 1;
          this.pagination.margin = 1;

          chunkBy = viewType === 'tile' ? 10 : 10;

          break;
        }
        case 'sm': {
          this.pagination.range = 1;
          this.pagination.margin = 2;

          chunkBy = viewType === 'tile' ? 10 : 10;

          break;
        }
        case 'md': {
          this.pagination.range = 2;
          this.pagination.margin = 2;

          chunkBy = viewType === 'tile' ? 20 : 10;

          break;
        }
        case 'lg': {
          this.pagination.range = 2;
          this.pagination.margin = 3;

          chunkBy = viewType === 'tile' ? 30 : 15;

          break;
        }
        case 'x-lg': {
          this.pagination.range = 3;
          this.pagination.margin = 3;

          chunkBy = viewType === 'tile' ? 40 : 20;

          break;
        }
        default: {
          this.pagination.range = 3;
          this.pagination.margin = 2;

          chunkBy = viewType === 'tile' ? 15 : 15;
        }
      }

      if (chunkBy) {
        this.pagination.pageSize = chunkBy;
        this.pagination.count = Math.ceil(length / chunkBy);
        this.pagination.page = this.pagination.count >= 1 ? 1 : 0;
        this.navigate(this.pagination.page);
      }
    },
  },
  computed: {
    ...mapGetters({
      items: 'catalog/items',
      chunk: 'catalog/chunk',
      breakpoint: 'breakpoint',
      viewType: 'viewType',
    }),
  },
  watch: {
    breakpoint(newValue) {
      this.updatePaginationConfig(newValue);
    },
    items() {
      this.updatePaginationConfig(this.breakpoint);
    },
    viewType() {
      this.updatePaginationConfig(this.breakpoint);
    },
  },
  mounted() {
    this.updatePaginationConfig(this.breakpoint);
  },
};
</script>

<style lang="scss">
.pagination {
  user-select: none;
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;

  & > li{
    display: inline;

    &.active > a, &.active > a:hover{
      background: rgba($light-blue, 0.2);
    }

    &.disabled > a{
      pointer-events: none;
      color: $light-gray;
    }

    &:last-child > a{
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:first-child > a{
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    & > a{
      position: relative;
      float: left;
      padding: 0.4em 0.8em;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;

      @include for-phone-only {
        padding: 0.3em 0.6em;
      }

      @include for-tablet-portrait-up {
        padding: 0.35em 0.7em;
      }

      @include for-tablet-landscape-up {
        padding: 0.45em 0.9em;
      }

      @include for-desktop-up {
        padding: 0.6em 1.2em;
      }

      &:hover{
        background: rgba($light-gray, 0.1);
      }
    }
  }
}
</style>
