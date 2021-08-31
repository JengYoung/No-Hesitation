export default function Input({ $target, initialState, onChange }) {
  const $input = document.createElement('input');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $input.value = this.state;
  };

  this.render = () => {
    $target.appendChild($input);
  };

  this.render();

  $input.addEventListener('keyup', e => {
    onChange(e.target.value);
  });
}
