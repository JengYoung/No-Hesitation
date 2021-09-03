import Post from '../components/Post.js';
import names from './classNames.js';
import { _appendChilds, _createElemWithAttr } from './customDOMMethods.js';

export default function renderPosts($parentNode, nowDocuments) {
  const {
    outlinedIcon,
    addIcon,
    sz150,
    postNextNewText,
    postNextNew,
    postNextNewIcon,
  } = names;

  if (!nowDocuments.length) {
    const $postNextNew = _createElemWithAttr('div', [postNextNew]);

    const $postNewIcon = _createElemWithAttr(
      'span',
      [outlinedIcon, sz150, postNextNewIcon],
      addIcon,
    );

    const $postNextNewText = _createElemWithAttr(
      'span',
      [postNextNewText],
      '빈 페이지',
    );

    _appendChilds($postNextNew, $postNewIcon, $postNextNewText);
    _appendChilds($parentNode, $postNextNew);
    return;
  }
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
  });
}
