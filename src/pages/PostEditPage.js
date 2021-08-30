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
  const $page = new DocumentFragment();
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
      debounce(setItem, 2000)(getLocalPostKey(postId), { ...post });
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    const post = getItem(getLocalPostKey(postId), defaultValue);
    this.render();
    postForm.setState(post);
  };

  this.render = () => {
    $target.appendChild($page);
  };
}

const getLocalPostKey = postId => {
  return `temp-save-${postId}`;
};