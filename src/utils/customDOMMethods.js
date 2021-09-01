export const _createElemWithAttr = (
  elemTagName = 'div',
  classNames = [],
  text = '',
) => {
  const $elem = document.createElement(elemTagName);
  if (classNames) $elem.classList.add(...classNames);
  if (text.length) $elem.textContent = text;
  return $elem;
};
/*
  _: 기존 이름과 헷갈리지 않기 위해 사용한 custom rule입니다!
*/

export const _appendChilds = (node, ...rest) => {
  if (rest) rest.map(child => node.appendChild(child));
};
