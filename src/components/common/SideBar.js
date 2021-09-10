import {
  _removeAllChildNodes,
  _createElemWithAttr,
  _renderPosts,
  _renderChild,
} from '@/utils/customDOMMethods';
import names from '@/utils/classNames';
import createPost from '@/apis/route/post/createPost';
import { push } from '@/apis/router';
import deletePost from '@/apis/route/post/deletePost';
import getPostList from '@/apis/route/post/getPostList';
import Button from '@/components/common/Button';
import checkState from '@/utils/checkState';
import { renderModalByEvent } from '@/utils/renderComponentMethods';
import {
  BUTTON_COMPONENT_TEXT,
  INPUT_TITLE_MESSAGE,
  MODAL_DELETE_QUESTION,
} from '@/utils/constants';
import { clickPosts, togglePosts } from '@/utils/customEvent';

/*
  {
    username,
    documents: []
  }
*/

export default function SideBar({ $target, initialState, onClick }) {
  const {
    sideBarContainer,
    postsItem,
    postsBlock,
    sideBarItem,
    sideBarButtonBox,
    sideBarCreatePostBtn,
    postNext,
    postNextNew,
    postCreateBtn,
    postRemoveBtn,
  } = names;

  const $sideBar = _createElemWithAttr('nav', [sideBarContainer]);
  const $posts = _createElemWithAttr('section', [sideBarItem, postsBlock]);
  this.state = initialState;

  const $sideBarButtonBox = _createElemWithAttr('div', [sideBarButtonBox]);
  new Button({
    $target: $sideBarButtonBox,
    attributes: {
      classNames: [sideBarCreatePostBtn],
      text: BUTTON_COMPONENT_TEXT,
    },
    onClick: () => openCreatePageModal(),
  });
  $sideBar.appendChild($sideBarButtonBox);

  this.setState = nextState => {
    if (!checkState(this.state, nextState)) {
      _removeAllChildNodes($posts);
      this.state = nextState;
      const $fragment = new DocumentFragment();
      _renderPosts($fragment, this.state.documents);
      $posts.appendChild($fragment);
      this.render();
    }
  };

  this.render = () => {
    _renderChild($sideBar, $posts, sideBarItem);
    _renderChild($target, $sideBar, sideBarContainer);
  };
  this.render();

  // click post
  clickPosts($sideBar, onClick);

  //toggle
  togglePosts($posts);

  // create post
  $sideBar.addEventListener('click', e => {
    renderModal({
      eventTarget: e.target,
      isValid: e.target.closest(`.${postNextNew}`),
      closestSelectorName: postNext,
    });
  });

  // create post
  $sideBar.addEventListener('click', e => {
    renderModal({
      eventTarget: e.target,
      isValid: e.target.classList.contains(postCreateBtn),
      closestSelectorName: postsItem,
    });
  });

  // delete post
  $sideBar.addEventListener('click', e => {
    if (!e.target.classList.contains(postRemoveBtn)) return;
    const closestPostsItem = e.target.closest(`.${postsItem}`);
    renderModalByEvent({
      head: MODAL_DELETE_QUESTION,
      isInput: false,
      tryFunc: async () => {
        await deletePost(this.state.username, closestPostsItem.dataset.id);
        const posts = await getPostList(this.state.username);
        this.setState({
          documents: posts,
        });
      },
    });
  });

  const renderModal = async ({ eventTarget, isValid, closestSelectorName }) => {
    if (!isValid) return;
    const $elem = eventTarget.closest(`.${closestSelectorName}`);
    await openCreatePageModal($elem);
  };

  const openCreatePageModal = async $elem => {
    renderModalByEvent({
      head: INPUT_TITLE_MESSAGE,
      isInput: true,
      tryFunc: async title => {
        const result = await createPost(this.state.username, {
          title,
          parent: $elem?.dataset.id ?? null,
        });
        push(`/posts/${result.id}`);
      },
    });
  };
}
