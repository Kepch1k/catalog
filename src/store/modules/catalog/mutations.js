export default {
  selectItem: async (state, id) => {
    state.selectedItem = state.items.filter((item) => +item.id === +id).pop();
  },
  deleteItem: async (state, id) => {
    state.items = state.items.filter((item) => +item.id !== +id);
  },
  addItem: async (state, item) => {
    state.lastIndex += 1;

    state.items = [
      ...state.items,
      { ...item, id: state.lastIndex },
    ];
  },
  pickChunk: async (state, { page, chunkSize }) => {
    state.chunk = state.items.slice((page - 1) * chunkSize, page * chunkSize);
  },
  updateItem: async (state, item) => {
    state.items = state.items.map((i) => {
      if (+i.id === +item.id) {
        return {
          ...i,
          ...item,
          backState: i,
        };
      }

      return i;
    });

    /* update selectedItem if touched */
    if (+state.selectedItem.id === +item.id) {
      state.selectedItem = state.items.filter((i) => +i.id === +item.id).pop();
    }
  },
};
