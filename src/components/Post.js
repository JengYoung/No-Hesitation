import names from '../utils/classNames.js';
import { API_END_POINT } from '../utils/constants.js';
import _appendChilds from '../utils/_appendChilds.js';

/*
  id, title
*/

const { sideBarContainer, postToggleBtn, postRemoveBtn, postLink, postBlock } =
  names;

export default function Post({ $target, initialState }) {
  this.state = initialState;

  this.fragment = new DocumentFragment();
  this.$post = document.createElement('div');
  this.$post.classList.add(sideBarContainer, postBlock);

  this.$postToggleButton = document.createElement('button');
  this.$postToggleButton.classList.add(postToggleBtn);

  this.$postLink = document.createElement('a');
  this.$postLink.classList.add(postLink);

  this.$postRemoveButton = document.createElement('button');
  this.$postRemoveButton.classList.add(postRemoveBtn);

  _appendChilds(
    this.fragment, // append 대상
    this.$post,
    this.$postToggleButton,
    this.$postLink,
    this.$postRemoveButton,
  );

  this.render = () => {
    const { id, title } = this.state;
    this.$postLink.setAttribute('href', `${API_END_POINT}/${id}`);
    this.$postLink.textContent = title;

    $target.appendChild(this.fragment);
  };
  this.render();
}
