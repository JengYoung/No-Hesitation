export default function renderPosts($parentNode, nowDocuments) {
  if (!nowDocuments.length) return;
  nowDocuments.map(doc => {
    const $nowNode = document.createElement('h6');
    const { id, title, documents: nextDocs } = doc;
    $nowNode.dataset.id = id;
    $nowNode.textContent = title;

    $parentNode.appendChild($nowNode);
    renderPosts($nowNode, nextDocs);
  });
}
