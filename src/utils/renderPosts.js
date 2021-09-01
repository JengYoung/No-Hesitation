import Post from '../components/Post.js';

export default function renderPosts($parentNode, nowDocuments) {
  if (!nowDocuments.length) return;
  nowDocuments.map(doc => {
    const { id, title, documents: nextDocs } = doc;

    const post = new Post({
      $target: $parentNode,
      initialState: {
        id,
        title,
      },
    });

    renderPosts(post.$postNext, nextDocs);
    post.render();
  });
}
