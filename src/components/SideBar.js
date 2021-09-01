import classNames from '../utils/classNames.js';
import {
  _removeAllChildNodes,
  _createElemWithAttr,
} from '../utils/customDOMMethods.js';
import renderPosts from '../utils/renderPosts.js';
import names from '../utils/classNames.js';

/*
  {
    documents: []
  }
*/

const { postsBlock, sideBarItem, postBlock, postToggleBtn, postNext } = names;
export default function SideBar({ $target, initialState, onClick }) {
  const $sideBar = document.createElement('nav');
  $sideBar.className = classNames.sideBarContainer;
  $target.appendChild($sideBar);

  const $posts = _createElemWithAttr('section', [sideBarItem, postsBlock]);
  this.state = initialState;

  this.setState = nextState => {
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      _removeAllChildNodes($sideBar);
      this.state = nextState;
      const { documents } = this.state;
      const $fragment = new DocumentFragment();
      renderPosts($fragment, documents);
      $posts.appendChild($fragment);
      $sideBar.appendChild($posts);
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };

  $sideBar.addEventListener('click', e => {
    if (e.target.tagName !== 'A') return;
    const postId = e.target.getAttribute(['data-id']);
    onClick(postId);
  });

  $posts.addEventListener('click', e => {
    const { target } = e;
    if (!target.classList.contains(postToggleBtn)) return;
    const closestPostId = target.closest(`.${postBlock}`).dataset.id;
    const $nextItem = $posts.querySelector(
      `.${postNext}[data-id="${closestPostId}"]`,
    );
    $nextItem.classList.toggle('invisible');
    target.classList.toggle('toggle');
  });
}
