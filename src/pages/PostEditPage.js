import getPost from '@/apis/route/post/getPost';
import getPostList from '@/apis/route/post/getPostList';
import updatePost from '@/apis/route/post/updatePost';
import {
  dispatchUpdateTitle,
  updateTitleDispatcher,
} from '@/utils/customEvent';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import SideBar from '@/components/SideBar';
import names from '@/utils/classNames';
import { _createElemWithAttr, _renderChild } from '@/utils/customDOMMethods';
import debounce from '@/utils/debounce';
import { getItem, setItem } from '@/utils/storage';
import SubPosts from '@/components/post/SubPosts';
/*
 this.state = {
    id: 'new',
    title: '',
    content: '',
    documents: [],
    createdAt: '',
    updatedAt: '',
 }
 */
export default function PostEditPage({
  $target,
  initialState = {
    id: 'new',
    title: '',
    content: '',
    documents: [],
    createdAt: '',
    updatedAt: '',
  },
  onClick,
}) {
  const { mainContainer, postEditPage, postEditContainer } = names;
  const $page = _createElemWithAttr('div', [postEditPage]);
  const $container = _createElemWithAttr('div', [mainContainer]);
  const $postEditContainer = _createElemWithAttr('section', [
    postEditContainer,
  ]);
  this.state = initialState;
  const { id } = this.state;

  const defaultValue = { title: '', content: '' };
  const post = getItem(getLocalPostKey(id), defaultValue);

  /***************************************
   *             components              *
   ***************************************/

  const header = new Header({
    $target: $page,
    initialState: {
      username: this.state.username,
    },
  });

  const sideBar = new SideBar({
    $target: $container,
    initialState,
    onClick,
  });

  $container.appendChild($postEditContainer);

  const postForm = new PostForm({
    $target: $postEditContainer,
    initialState: {
      ...post,
    },
    onEdit: debounce(
      post => setItem(getLocalPostKey(this.state.id), { ...post }),
      500,
    ),
    onUpdate: debounce(async ({ title, content }) => {
      await updatePost(this.state.id, this.state.username, {
        title,
        content: content ?? '\n', // 수정의 경우, 제목을 바꿨으나 내용물이 없으면 보내지지 않으므로 띄어쓰기 하나라도 만들어서, 제목을 수정시킵니다.
      });
      dispatchUpdateTitle({
        id: window.location.pathname.split('/')[2],
        title,
      });
    }, 1500),
  });

  const subPosts = new SubPosts({
    $target: $postEditContainer,
    initialState: {
      documents: [],
    },
  });

  // id가 바뀔 때 페이지의 상태가 변화합니다!
  this.setState = async nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const { id, username } = this.state;
    header.setState({ username });
    sideBar.setState({
      username,
      documents: await getPostList(this.state.username),
    });

    let post = getItem(getLocalPostKey(this.state.id), defaultValue);
    if (id) {
      post = await getPost(id, username);
    }
    postForm.setState(post);
    subPosts.setState({
      documents: this.state.documents,
    });
    this.render();
  };

  this.render = () => {
    if (!$target.querySelector('form')) {
      postForm.render();
      subPosts.render();
    } // 에디터의 경우 여기서 렌더링을 해줘야, setState할 때 다시 렌더링되지 않습니다.
    _renderChild($container, $postEditContainer, postEditContainer);
    _renderChild($page, $container, mainContainer);
    _renderChild($target, $page, postEditPage);
  };

  updateTitleDispatcher();
}

const getLocalPostKey = postId => {
  return `temp-save-${postId}`;
};
