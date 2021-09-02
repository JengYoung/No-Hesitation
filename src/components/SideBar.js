import classNames from '../utils/classNames.js';
import {
  _removeAllChildNodes,
  _createElemWithAttr,
} from '../utils/customDOMMethods.js';
import renderPosts from '../utils/renderPosts.js';
import names from '../utils/classNames.js';
import createPost from '../apis/route/post/createPost.js';
import InputModal from './common/InputModal.js';

/*
  {
    documents: []
  }
*/

const {
  postsBlock,
  sideBarItem,
  postBlock,
  postToggleBtn,
  postNext,
  postNextNew,
} = names;
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

  $sideBar.addEventListener('click', e => {
    const closestPostNextNew = e.target.closest(`.${postNextNew}`);
    if (!closestPostNextNew) return;
    const inputModal = new InputModal({
      $target: document.querySelector('#app'),
      head: '생성할 페이지의 제목을 입력해주세요!',
      onConform: ({ title, parent }) => {
        createPost(this.state.username, { body: { title, parent } });
      },
    });
    inputModal.render();
  });
}
