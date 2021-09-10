import getPost from '@/apis/route/post/getPost';
import getPostList from '@/apis/route/post/getPostList';
import updatePost from '@/apis/route/post/updatePost';
import {
  dispatchUpdateTitle,
  updateTitleDispatcher,
} from '@/utils/customEvent';
import Header from '@/components/common/Header';
import PostForm from '@/components/postEdit/PostForm';
import SideBar from '@/components/common/SideBar';
import names from '@/utils/classNames';
import { _createElemWithAttr, _renderChild } from '@/utils/customDOMMethods';
import debounce from '@/utils/debounce';
import { getItem, setItem } from '@/utils/storage';
import SubPosts from '@/components/postEdit/SubPosts';
import Breadcrumb from '@/components/postEdit/BreadCrumb';
import { push } from '@/apis/router';
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

  const breadcrumb = new Breadcrumb({
    $target: $postEditContainer,
    initialState: {
      id: this.state.id,
      paths: [],
    },
    onClick: id => {
      push(`/posts/${id}`);
    },
  });

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
    onClick,
  });

  // id가 바뀔 때 페이지의 상태가 변화합니다!
  this.setState = async nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const { id, username, documents } = this.state;
    const allDocuments = await getPostList(username);
    header.setState({ username });
    sideBar.setState({
      username,
      documents: allDocuments,
    });
    let post = getItem(getLocalPostKey(id), defaultValue);
    if (id) {
      post = await getPost(id, username);
    }
    breadcrumb.setState({
      id,
      paths: getFindParentNodesById(this.state.id, allDocuments),
    });
    postForm.setState(post);
    subPosts.setState({
      documents,
    });

    this.render();
  };

  this.render = () => {
    _renderChild($container, $postEditContainer, postEditContainer);
    _renderChild($page, $container, mainContainer);
    _renderChild($target, $page, postEditPage);
  };

  updateTitleDispatcher();

  const getFindParentNodesById = (targetId, nodes) => {
    const queue = [[nodes, []]];
    while (queue.length) {
      const [nowNode, paths] = queue.shift();
      for (let i = 0; i < nowNode.length; i += 1) {
        const { id, title, documents } = nowNode[i];
        const nextPaths = [...paths, [id, title]];
        if (id === targetId) {
          return nextPaths;
        }
        queue.push([documents, nextPaths]);
      }
    }
    return [];
  };
}

const getLocalPostKey = postId => {
  return `temp-save-${postId}`;
};
