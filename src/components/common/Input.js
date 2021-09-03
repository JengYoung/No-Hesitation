import { _createElemWithAttr } from '@/utils/customDOMMethods';

export default function Input({
  $target,
  classNames = [],
  placeholder,
  initialState,
  onChange,
}) {
  this.$input = _createElemWithAttr('input', classNames);
  this.$input.placeholder = placeholder;
  this.state = initialState;

  this.setState = nextState => {
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
