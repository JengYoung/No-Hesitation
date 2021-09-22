import Post from '@/components/common/Post';
import names from '@/utils/classNames';

export const _createElemWithAttr = (
  elemTagName = 'div',
  classNames = [],
  text = '',
) => {
  const $elem = document.createElement(elemTagName);
  if (classNames) $elem.classList.add(...classNames);
  if (text?.length) $elem.textContent = text;
  return $elem;
};
/*
  _: 기존 이름과 헷갈리지 않기 위해 사용한 custom rule입니다!
*/

export const _appendChilds = (node, ...rest) => {
  if (rest) rest.map(child => node.appendChild(child));
};

export const _removeAllChildNodes = node => {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
};

export const _renderPosts = (
  $parentNode,
  nowDocuments,
  depth = 0,
  isSidebar = true,
) => {
  const {
    outlinedIcon,
    addIcon,
    sz125,
    postNextNewText,
    postNextNew,
    postNextNewIcon,
  } = names;

  if (!nowDocuments.length && isSidebar) {
    const $postNextNew = _createElemWithAttr('div', [postNextNew]);
    const $postNewIcon = _createElemWithAttr(
      'span',
      [outlinedIcon, sz125, postNextNewIcon],
      addIcon,
    );

    const $postNextNewText = _createElemWithAttr(
      'span',
      [postNextNewText],
      '빈 페이지',
    );
    $postNextNew.style.cssText = `padding-left: ${depth + 0.5}rem`;

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
        depth,
      },
      isSidebar,
    });

    _renderPosts(post.$postNext, nextDocs, depth + 1, isSidebar);
  });
};

export const _renderChild = ($parent, $target, targetSelector) => {
  if ($parent.querySelector(`.${targetSelector}`)) return;
  $parent.appendChild($target);
};
