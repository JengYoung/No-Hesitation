import checkState from '../../utils/checkState.js';

export default function Header({
  $target,
  headerSize,
  initialState = {
    content: '',
  },
}) {
  const $header = document.createElement(headerSize);

  this.state = initialState;

  this.setState = nextState => {
    if (checkState(this.state, nextState)) {
      this.state = {
        ...this.state,
        ...nextState,
      };
    }
    this.render();
  };

  this.render = () => {
    $header.textContent = `${this.state.content}님, 안녕하세요!`;
    $target.appendChild($header);
  };
}
