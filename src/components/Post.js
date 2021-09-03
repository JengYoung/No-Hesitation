import names from '@/utils/classNames';
import { _appendChilds, _createElemWithAttr } from '@/utils/customDOMMethods';

/*
  id, title
*/
const {
  postsItem,
  postToggleBtn,
  postRemoveBtn,
  postLink,
  postBlock,
  postNext,
  outlinedIcon,
  sharpIcon,
  sz150,
  sz175,
  arrowRightIcon,
  removePostIcon,
} = names;

export default function Post({ $target, initialState }) {
  this.state = initialState;
  const { id, title } = this.state;

  this.$post = _createElemWithAttr('div', [postsItem, postBlock]);
  this.$postToggleButton = _createElemWithAttr(
    'button',
    [postToggleBtn, outlinedIcon, sz175, 'toggle'],
    arrowRightIcon,
  );
  this.$post.dataset['id'] = id;

  this.$postLink = _createElemWithAttr('a', [postLink], title);
  this.$postLink.dataset['id'] = id;

  this.$postRemoveButton = _createElemWithAttr(
    'button',
    [postRemoveBtn, sharpIcon, sz150],
    removePostIcon,
  );
  this.$postNext = _createElemWithAttr('section', [postNext]);
  this.$postNext.dataset['id'] = id;

  _appendChilds(
    this.$post, // append 대상
    this.$postToggleButton,
    this.$postLink,
    this.$postRemoveButton,
  );

  this.render = () => {
    $target.appendChild(this.$post);
    $target.appendChild(this.$postNext);
  };

  this.render();
}
