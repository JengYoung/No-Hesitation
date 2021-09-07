import names from '@/utils/classNames';
import {
  _appendChilds,
  _createElemWithAttr,
  _renderChild,
} from '@/utils/customDOMMethods';

/*
  id, title
*/

export default function Post({ $target, initialState }) {
  const {
    postsItem,
    postToggleBtn,
    postButtonBox,
    postCreateBtn,
    postRemoveBtn,
    postLink,
    postBlock,
    postNext,
    sz150,
    sz175,
    outlinedIcon,
    sharpIcon,
    arrowRightIcon,
    removePostIcon,
    addIcon,
  } = names;

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
  this.$postButtonBox = _createElemWithAttr('div', [postButtonBox]);
  this.$postCreateButton = _createElemWithAttr(
    'button',
    [postCreateBtn, outlinedIcon, sz150],
    addIcon,
  );
  this.$postRemoveButton = _createElemWithAttr(
    'button',
    [postRemoveBtn, sharpIcon, sz150],
    removePostIcon,
  );

  _appendChilds(
    this.$postButtonBox,
    this.$postCreateButton,
    this.$postRemoveButton,
  );
  _appendChilds(
    this.$post, // append 대상
    this.$postToggleButton,
    this.$postLink,
    this.$postButtonBox,
  );

  this.$postNext = _createElemWithAttr('section', [postNext]);
  this.$postNext.dataset['id'] = id;

  this.render = () => {
    _renderChild($target, this.$post, postsItem);
    _renderChild($target, this.$postNext, postNext);
  };

  this.render();
}
