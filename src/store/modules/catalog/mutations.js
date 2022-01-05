export default {
  selectItem: async (state, id) => {
    state.selectedItem = state.items.filter((item) => +item.id === +id).pop();
  },
  deleteItem: async (state, id) => {
    state.items = state.items.filter((item) => +item.id !== +id);
  },
  pickChunk: async (state, { page, chunkSize }) => {
    state.chunk = state.items.slice((page - 1) * chunkSize, page * chunkSize);
  },
};
