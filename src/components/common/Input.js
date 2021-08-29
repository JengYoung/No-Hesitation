export default function Input({ $target, initialState, onChange }) {
  const $input = document.createElement('input');
  $target.appendChild($input);

  this.state = initialState;
  $input.value = this.state;

  this.setState = nextState => {
    this.state = nextState;
  };

  $input.addEventListener('keyup', e => {
    onChange(e.target.value);
  });
}
