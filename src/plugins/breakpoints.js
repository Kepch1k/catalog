export default function () {
  const windowWidth = window.innerWidth;
  let breakpoint = null;

  if (windowWidth < 480) {
    breakpoint = 'xs';
  } else if (windowWidth >= 1800) {
    breakpoint = 'x-lg';
  } else if (windowWidth >= 1260) {
    breakpoint = 'lg';
  } else if (windowWidth >= 960) {
    breakpoint = 'md';
  } else {
    breakpoint = 'sm';
  }
  return breakpoint;
}
