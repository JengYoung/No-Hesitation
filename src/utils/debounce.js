export default function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(args);
      callback(...args);
    }, delay);
  };
}
