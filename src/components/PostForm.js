import debounce from '../utils/debounce.js';
import { setItem } from '../utils/storage.js';
import Input from './common/Input.js';

export default function PostForm({
  $target,
  initialState = { title: '', content: '' },
}) {
  // 초기 컴포넌트를 DOM에 추가하고, 상태를 초기화합니다.
  const $editor = document.createElement('div');
  $target.appendChild($editor);

  /*
   * this.state = {
   *   title: string
   *   content: string
   * }
   */
  this.state = initialState;

  const savePost = (id = 'new', state = this.state) => {
    setItem(id, state);
  };

  /*************************************
   *            component              *
   *************************************/
  const postTitle = new Input({
    $target: $editor,
    initialState: this.state.title,
    onChange: title => {
      const nextState = {
        ...this.state,
        title,
      };
      this.setState(nextState);
      postTitle.setState(this.state.title);
      debounce(savePost, 2000)('new', this.state);
    },
  });

  const $postContent = document.createElement('textarea');
  $editor.appendChild($postContent);

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    debounce(savePost, 2000)('new', this.state);
    this.render();
  };

  this.render = () => {
    $postContent.value = this.state.content;
  };

  this.render();

  $postContent.addEventListener('keyup', e => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
  });
}
