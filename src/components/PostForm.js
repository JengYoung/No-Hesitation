import Input from './common/Input.js';

export default function PostForm({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEdit,
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
      postTitle.setState(title);
      onEdit(this.state);
    },
  });

  const $postContent = document.createElement('textarea');
  $editor.appendChild($postContent);

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.render();
  };

  this.render = () => {
    const { content } = this.state;
    $postContent.value = content;
  };

  this.render();

  $postContent.addEventListener('keyup', e => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
    onEdit({ ...this.state });
  });
}
