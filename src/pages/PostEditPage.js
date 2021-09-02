import getPost from '../apis/route/post/getPost.js';
import updatePost from '../apis/route/post/updatePost.js';
import PostForm from '../components/PostForm.js';
import debounce from '../utils/debounce.js';
import { getItem, setItem } from '../utils/storage.js';
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
}) {
  const $page = document.createElement('div');
  this.state = initialState;
  const { id } = this.state;

  const defaultValue = { title: '', content: '' };
  const post = getItem(getLocalPostKey(id), defaultValue);

  const postForm = new PostForm({
    $target: $page,
    initialState: {
      ...post,
    },
    onEdit: debounce(
      post => setItem(getLocalPostKey(this.state.id), { ...post }),
      2000,
    ),
    onUpdate: debounce(async ({ title, content }) => {
      const res = await updatePost(this.state.id, this.state.username, {
        title,
        content,
      });
    }, 5000),
  });

  // id가 바뀔 때 페이지의 상태가 변화합니다!
  this.setState = async nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const { id, username } = this.state;
    let post = getItem(getLocalPostKey(this.state.id), defaultValue);
    if (id) {
      post = await getPost(id, username);
    }
    postForm.setState(post);
    this.render();
  };

  this.render = () => {
    if ($target.querySelector('form') === null) {
      postForm.render(); // 에디터의 경우 여기서 렌더링을 해줘야, setState할 때 다시 렌더링되지 않습니다.
    }
    $target.appendChild($page);
  };
}

const getLocalPostKey = postId => {
  return `temp-save-${postId}`;
};
