import SET_VIEW_TYPE from './types';

export default {
  setViewType: ({ commit }, newValue) => {
    commit(SET_VIEW_TYPE, newValue);
  },
};
