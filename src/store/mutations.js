import breakpoints from '../plugins/breakpoints';

export default {
  updateBreakpoint: (state) => {
    state.breakpoint = breakpoints();
  },
};
