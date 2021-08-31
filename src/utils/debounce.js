export default function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log(args);
      await callback(...args);
    }, delay);
  };
}
