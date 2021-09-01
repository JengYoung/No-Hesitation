import classNames from '../utils/classNames.js';
import removeAllChildNodes from '../utils/removeAllChildNodes.js';
import renderPosts from '../utils/renderPosts.js';
import { _createElemWithAttr } from '../utils/customDOMMethods.js';
import names from '../utils/classNames.js';

/*
  {
    documents: []
  }
*/
const { postsBlock, sideBarItem } = names;
export default function SideBar({ $target, initialState, onClick }) {
  const $sideBar = document.createElement('nav');
  $sideBar.className = classNames.sideBarContainer;
  $target.appendChild($sideBar);

  const $posts = _createElemWithAttr('section', [sideBarItem, postsBlock]);
  this.state = initialState;

  this.setState = nextState => {
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      removeAllChildNodes($sideBar);
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
}
