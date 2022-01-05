import breakpoints from '../plugins/breakpoints';
import SET_VIEW_TYPE from './types';

export default {
  updateBreakpoint: async (state) => {
    state.breakpoint = breakpoints();
  },
  [SET_VIEW_TYPE]: async (state, viewType) => {
    state.viewType = viewType;
  },
};
