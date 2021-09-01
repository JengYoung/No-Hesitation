/*
  _: 기존 이름과 헷갈리지 않기 위해 사용한 custom rule입니다!
*/

export default function _appendChilds(node, ...rest) {
  rest.map(child => node.appendChild(child));
}
