import breakpoints from '../plugins/breakpoints';

export default {
  updateBreakpoint: async (state) => {
    state.breakpoint = breakpoints();
  },
  setViewType: async (state, viewType) => {
    state.viewType = viewType;
  },
};
