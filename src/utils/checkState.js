export default function checkState(state, cmpState) {
  return typeof state === typeof cmpState &&
    JSON.stringify(state) === JSON.stringify(cmpState)
    ? true
    : false;
}
