import classNames from '../utils/classNames.js';
import removeAllChildNodes from '../utils/removeAllChildNodes.js';
import renderPosts from '../utils/renderPosts.js';

/*
  {
    documents: []
  }
 */
export default function SideBar({ $target, initialState, onClick }) {
  const $sideBar = document.createElement('nav');
  $sideBar.className = classNames.sidebarContainer;
  $target.appendChild($sideBar);

  this.state = initialState;

  this.setState = nextState => {
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      removeAllChildNodes($sideBar);
      this.state = nextState;
      const { documents } = this.state;
      const $fragment = new DocumentFragment();
      renderPosts($fragment, documents);
      $sideBar.appendChild($fragment);
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };

  $sideBar.addEventListener('click', e => {
    if (e.target.tagName !== 'H6') return;
    const postId = e.target.getAttribute(['data-id']);
    onClick(postId);
  });
}
