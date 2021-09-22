import names from '@/utils/classNames';
import { _appendChilds, _createElemWithAttr } from '@/utils/customDOMMethods';

/*
  id, title
*/

export default function Post({ $target, initialState, isSidebar }) {
  const {
    postsItem,
    postToggleBtn,
    postButtonBox,
    postCreateBtn,
    postRemoveBtn,
    postLink,
    postBlock,
    postNext,
    sz125,
    sz175,
    outlinedIcon,
    sharpIcon,
    arrowRightIcon,
    removePostIcon,
    addIcon,
  } = names;

  this.state = initialState;
  const { id, title, depth } = this.state;
  console.log(depth);

  this.$post = _createElemWithAttr('div', [postsItem, postBlock]);
  this.$post.dataset['id'] = id;
  this.$post.style.cssText = `
    padding-right: 0.5rem; 
    padding-left:${depth + 0.5}rem;
  `;

  this.$postLink = _createElemWithAttr('a', [postLink], title);
  this.$postLink.dataset['id'] = id;

  this.$postToggleButton = _createElemWithAttr(
    'button',
    [postToggleBtn, outlinedIcon, sz175, 'toggle'],
    arrowRightIcon,
  );

  if (isSidebar) {
    this.$postButtonBox = _createElemWithAttr('div', [postButtonBox]);
    this.$postCreateButton = _createElemWithAttr(
      'button',
      [postCreateBtn, outlinedIcon, sz125],
      addIcon,
    );
    this.$postRemoveButton = _createElemWithAttr(
      'button',
      [postRemoveBtn, sharpIcon, sz125],
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
  } else {
    _appendChilds(
      this.$post, // append 대상
      this.$postToggleButton,
      this.$postLink,
    );
  }

  this.$postNext = _createElemWithAttr('section', [postNext]);
  this.$postNext.dataset['id'] = id;

  this.render = () => {
    _appendChilds($target, this.$post, this.$postNext);
  };

  this.render();
}
