import names from '../../utils/classNames.js';
import {
  _appendChilds,
  _createElemWithAttr,
} from '../../utils/customDOMMethods.js';
import Input from './Input.js';

export default function Modal({
  $target = document.querySelector('#app'),
  head = '내용을 입력해주세요!',
  isInput = false,
  initialState = { title: '' },
  onConform,
}) {
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
  this.$container = _createElemWithAttr('div', [container]);

  const $modal = _createElemWithAttr('div', [modalBlock]);
  const $modalHead = _createElemWithAttr('h3', [modalHead], head);
  const $modalButtonBox = _createElemWithAttr('div', [modalButtonBox]);
  const $conformButton = _createElemWithAttr('button', [modalConformButton]);
  const $cancelButton = _createElemWithAttr('button', [modalCancelButton]);

  $conformButton.textContent = '확인';
  $cancelButton.textContent = '취소';
  $fragment.appendChild(this.$container);
  this.$container.appendChild($modal);
  $modal.appendChild($modalHead);

  if (isInput) {
    this.state = initialState;
    const input = new Input({
      $target: $modal,
      placeholder: '제목을 입력해주세요!',
      initialState: this.state,
      onChange: title => {
        this.setState({ title });
      },
    });
    input.$input.classList.add(modalInput);
    this.setState = nextState => {
      this.state = nextState;
      if (isInput) {
        input.setState({
          title: this.state.title,
        });
      }
    };
  }
  _appendChilds($modalButtonBox, $conformButton, $cancelButton);
  _appendChilds($modal, $modalButtonBox);

  this.render = () => {
    $target.appendChild($fragment);
  };

  const onCancel = () => {
    $target.removeChild(this.$container);
  };

  $conformButton.addEventListener(
    'click',
    async () => await onConform(isInput ? this.state.title : undefined),
  );
  $cancelButton.addEventListener('click', () => onCancel());
}
