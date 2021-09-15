import names from '@/utils/classNames';
import { _createElemWithAttr } from '@/utils/customDOMMethods';

export default function Loading({ $target }) {
  const { loadingBlock, modalContainer } = names;
  const $loading = _createElemWithAttr('div', [loadingBlock, modalContainer]);
  $target.appendChild($loading);

  this.state = false;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $loading.style.display = this.state ? 'block' : 'none';
  };
}
