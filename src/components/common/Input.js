export default function Input({
  $target,
  placeholder,
  initialState,
  onChange,
}) {
  this.$input = document.createElement('input');
  this.$input.placeholder = placeholder;
  this.state = initialState;

  this.setState = nextState => {
    console.log(nextState);
    this.state = nextState;
    this.$input.value = this.state.title;
  };

  this.render = () => {
    $target.appendChild(this.$input);
  };

  this.render();

  this.$input.addEventListener('keyup', e => {
    onChange({ title: e.target.value });
  });
}
