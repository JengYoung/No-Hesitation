import names from '../../utils/classNames.js';
import {
  _appendChilds,
  _createElemWithAttr,
} from '../../utils/customDOMMethods.js';
import Input from './Input.js';

export default function InputModal({
  $target = document.querySelector('#app'),
  head = '내용을 입력해주세요!',
  initialState = { title: '' },
  onConform,
}) {
  this.state = initialState;

  const {
    modalBlock,
    container,
    modalConformButton,
    modalCancelButton,
    modalHead,
    modalInput,
    modalButtonBox,
  } = names;

  const $fragment = new DocumentFragment();
  const $container = _createElemWithAttr('div', [container]);

  const $modal = _createElemWithAttr('div', [modalBlock]);
  const $modalHead = _createElemWithAttr('h3', [modalHead], head);
  const $modalButtonBox = _createElemWithAttr('div', [modalButtonBox]);
  const $conformButton = _createElemWithAttr('button', [modalConformButton]);
  const $cancelButton = _createElemWithAttr('button', [modalCancelButton]);

  $conformButton.textContent = '확인';
  $cancelButton.textContent = '취소';
  $fragment.appendChild($container);
  $container.appendChild($modal);
  $modal.appendChild($modalHead);

  const input = new Input({
    $target: $modal,
    placeholder: '제목을 입력해주세요!',
    initialState: this.state,
    onChange: title => {
      this.setState({ title });
    },
  });
  input.$input.classList.add(modalInput);
  _appendChilds($modalButtonBox, $conformButton, $cancelButton);
  _appendChilds($modal, $modalButtonBox);

  this.setState = nextState => {
    this.state = nextState;
    input.setState({
      title: this.state.title,
    });
  };

  this.render = () => {
    $target.appendChild($fragment);
  };

  const onCancel = () => {
    $target.removeChild($container);
  };

  $conformButton.addEventListener(
    'click',
    async () => await onConform(this.state.title),
  );
  $cancelButton.addEventListener('click', () => onCancel());
}
