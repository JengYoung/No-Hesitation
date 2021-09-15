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
import Loading from '@/components/common/Loading';

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
    sideBarSpacer,
    sideBarItem,
    sideBarButtonBox,
    sideBarCreatePostBtn,
    postNext,
    postNextNew,
    postCreateBtn,
    postRemoveBtn,
  } = names;

  const $sideBar = _createElemWithAttr('nav', [sideBarContainer]);
  $target.appendChild($sideBar);
  const $spacer = _createElemWithAttr('div', [sideBarSpacer]);
  const loading = new Loading({
    $target: $sideBar,
  });
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
    if (checkState(this.state, nextState)) return;
    _removeAllChildNodes($posts);

    this.state = {
      ...this.state,
      ...nextState,
    };

    const $fragment = new DocumentFragment();
    _renderPosts($fragment, this.state.documents);
    $posts.appendChild($fragment);

    loading.setState(this.state.isLoading);
    this.render();
  };

  this.render = () => {
    _renderChild($sideBar, $posts, sideBarItem);
    _renderChild($target, $sideBar, sideBarContainer);
    _renderChild($target, $spacer, sideBarSpacer);
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
        if (this.state.isLoading) return;
        this.setState({
          ...this.state,
          isLoading: true,
        });
        await deletePost(this.state.username, closestPostsItem.dataset.id);
        const posts = await getPostList(this.state.username);
        this.setState({
          ...this.state,
          documents: posts,
          isLoading: false,
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
        if (this.state.isLoading) return;
        this.setState({
          ...this.state,
          isLoading: true,
        });

        const result = await createPost(this.state.username, {
          title,
          parent: $elem?.dataset.id ?? null,
        });
        push(`/posts/${result.id}`);
        this.setState({
          ...this.state,
          isLoading: false,
        });
      },
    });
  };
}
