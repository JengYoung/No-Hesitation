export default function removeAllChildNodes(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}
