import renderPosts from '../utils/renderPosts.js';
import Header from './common/Header.js';

/*
 {
   documents: []
 }
 */
export default function SideBar({ $target, initialState, onClick }) {
  const $sideBar = document.createElement('nav');
  $target.appendChild($sideBar);

  this.state = initialState;

  this.setState = nextState => {
    console.log(this.state, nextState);
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
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
