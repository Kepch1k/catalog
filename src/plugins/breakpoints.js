export default function () {
  const windowWidth = window.innerWidth;
  let breakpoint = null;

  if (windowWidth < 480) {
    breakpoint = 'xs';
  } else if (windowWidth < 760) {
    breakpoint = 'sm';
  } else if (windowWidth >= 1800) {
    breakpoint = 'xx-lg';
  } else if (windowWidth >= 1260) {
    breakpoint = 'x-lg';
  } else if (windowWidth >= 960) {
    breakpoint = 'lg';
  } else {
    breakpoint = 'md';
  }
  return breakpoint;
}
