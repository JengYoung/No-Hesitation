/*
  일반적으로 동적으로 잘 렌더링 되지 않은 일반환된 버튼입니다.
  (이벤트 리스너가 탑재되었기 때문)
*/
export default function Button({ $target, initialState, onClick }) {
  const $button = document.createElement('button');
  this.state = initialState;

  this.render = () => {
    $target.appendChild($button);
  };

  $button.addEventListener('click', async () => await onClick());
}
