import PostForm from '../components/PostForm.js';
import debounce from '../utils/debounce.js';
import { getItem, setItem } from '../utils/storage.js';
/*
 * this.state = {
 *   postId: string,
 * }
 */
export default function PostEditPage({
  $target,
  initialState = { postId: 'new' },
}) {
  const $page = document.createDocumentFragment();
  this.state = initialState;
  const { postId } = this.state;

  const defaultValue = { title: '', content: '' };
  const post = getItem(getLocalPostKey(postId), defaultValue);

  const postForm = new PostForm({
    $target: $page,
    initialState: {
      ...post,
    },
    onEdit: post => {
      debounce(setItem, 2000)(getLocalPostKey(this.state.postId), { ...post });
    },
  });

  // postId가 바뀔 때 페이지의 상태가 변화합니다!
  this.setState = nextState => {
    this.state = nextState;
    const post = getItem(getLocalPostKey(this.state.postId), defaultValue);
    postForm.setState(post);
    this.render();
  };

  this.render = () => {
    postForm.render(); // 에디터의 경우 여기서 렌더링을 해줘야, setState할 때 다시 렌더링되지 않습니다.
    $target.appendChild($page);
  };
}

const getLocalPostKey = postId => {
  return `temp-save-${postId}`;
};
