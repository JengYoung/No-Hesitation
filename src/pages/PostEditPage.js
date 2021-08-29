import PostForm from '../components/PostForm.js';

/*
 * this.state = {
 *   postId: string,
 *   postInfo: {
 *     title: string
 *     content: string
 *   }
 * }
 */
export default function PostEditPage({
  $target,
  initialState = {
    postId: 'new',
    postInfo: {
      title: '',
      content: '',
    },
  },
}) {
  const $page = new DocumentFragment();

  this.state = initialState;

  const postForm = new PostForm({
    $target: $page,
    initialState: this.state.postInfo,
  });

  this.setState = nextState => {
    this.state = nextState;
    this.render();

    postForm.setState(nextState.postInfo);
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
