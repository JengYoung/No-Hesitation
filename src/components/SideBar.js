import classNames from '../utils/classNames.js';
import {
  _removeAllChildNodes,
  _createElemWithAttr,
} from '../utils/customDOMMethods.js';
import renderPosts from '../utils/renderPosts.js';
import names from '../utils/classNames.js';
import createPost from '../apis/route/post/createPost.js';
import Modal from './common/Modal.js';
import { push } from '../apis/router.js';
import { ERROR_STATUS } from '../utils/constants.js';
import deletePost from '../apis/route/post/deletePost.js';
import getPostList from '../apis/route/post/getPostList.js';
import Button from './common/Button.js';

/*
  {
    username,
    documents: []
  }
*/

export default function SideBar({ $target, initialState, onClick }) {
  const {
    postsItem,
    postsBlock,
    sideBarItem,
    sideBarButtonBox,
    sideBarCreatePostBtn,
    postBlock,
    postToggleBtn,
    postNext,
    postLink,
    postNextNew,
    postRemoveBtn,
  } = names;

  const $sideBar = document.createElement('nav');
  $sideBar.className = classNames.sideBarContainer;

  const $posts = _createElemWithAttr('section', [sideBarItem, postsBlock]);
  this.state = initialState;

  const $sideBarButtonBox = _createElemWithAttr('div', [sideBarButtonBox]);
  new Button({
    $target: $sideBarButtonBox,
    attributes: { classNames: [sideBarCreatePostBtn], text: '페이지 생성' },
    onClick: () => {
      const $app = document.querySelector('#app');
      const modal = new Modal({
        $target: $app,
        head: '생성할 페이지의 제목을 입력해주세요!',
        isInput: true,
        onConform: async title => {
          try {
            const result = await createPost(this.state.username, {
              title,
              parent: null,
            });
            push(`/posts/${result.id}`);
          } catch (e) {
            console.error(e);
            alert(ERROR_STATUS, e);
          }
        },
      });
      modal.render();
    },
  });
  $sideBar.appendChild($sideBarButtonBox);

  this.setState = nextState => {
    if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
      _removeAllChildNodes($posts);
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
    if (
      !e.target.classList.contains(postsItem) &&
      !e.target.classList.contains(postLink)
    )
      return;
    const postId = e.target.closest(`.${postsItem}`).getAttribute(['data-id']);
    onClick(postId);
  });

  $posts.addEventListener('click', e => {
    const { target } = e;
    if (!target.classList.contains(postToggleBtn, 'post__link')) return;
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
    const $app = document.querySelector('#app');
    const closestPostNext = e.target.closest(`.${postNext}`);
    const modal = new Modal({
      $target: $app,
      head: '생성할 페이지의 제목을 입력해주세요!',
      isInput: true,
      onConform: async title => {
        try {
          const result = await createPost(this.state.username, {
            title,
            parent: closestPostNext.dataset.id,
          });
          push(`/posts/${result.id}`);
        } catch (e) {
          console.error(e);
          alert(ERROR_STATUS, e);
        }
      },
    });
    modal.render();
  });

  $sideBar.addEventListener('click', e => {
    if (!e.target.classList.contains(postRemoveBtn)) return;
    const $app = document.querySelector('#app');
    const closestPostNext = e.target.closest(`.${postsItem}`);
    const modal = new Modal({
      $target: document.querySelector('#app'),
      head: '정말로 삭제하시겠어요?',
      isInput: false,
      onConform: async () => {
        try {
          await deletePost(this.state.username, closestPostNext.dataset.id);
          const posts = await getPostList(this.state.username);
          this.setState({
            documents: posts,
          });
        } catch (e) {
          console.error(e);
          alert(ERROR_STATUS, e);
        } finally {
          $app.removeChild(modal.$container);
        }
      },
    });
    modal.render();
  });
}
