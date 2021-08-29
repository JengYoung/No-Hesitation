export default function Header({ $target, headerSize, initialState = '' }) {
  const $header = document.createElement(headerSize);
  $target.appendChild($header);

  this.state = initialState;

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    $header.textcontent = this.state;
  };
}
