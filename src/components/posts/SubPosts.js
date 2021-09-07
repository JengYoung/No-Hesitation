import checkState from '@/utils/checkState';
import names from '@/utils/classNames';
import {
  _createElemWithAttr,
  _removeAllChildNodes,
  _renderChild,
  _renderPosts,
} from '@/utils/customDOMMethods';
import { clickPosts, togglePosts } from '@/utils/customEvent';

export default function SubPosts({
  $target,
  initialState = {
    documents: [],
  },
  onClick,
}) {
  this.state = initialState;
  const { subPostsBlock } = names;
  const $subPosts = _createElemWithAttr('section', [subPostsBlock]);
  $target.appendChild($subPosts);

  this.setState = nextState => {
    if (!checkState(this.state, nextState)) {
      _removeAllChildNodes($subPosts);
      this.state = nextState;
      const { documents } = this.state;
      const $fragment = new DocumentFragment();
      _renderPosts($fragment, documents, false);
      $subPosts.appendChild($fragment);
    }
    this.render();
  };

  this.render = () => {
    _renderChild($target, $subPosts);
  };

  togglePosts($subPosts);
  clickPosts($subPosts, onClick);
}
