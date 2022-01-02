export default {
  selectItem: (state, vendorCode) => {
    state.selectedItem = state.items.filter((item) => item.vendorCode === vendorCode).pop();
  },
};
