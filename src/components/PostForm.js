import Input from './common/Input.js';

export default function PostForm({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEdit,
  onUpdate,
}) {
  // 초기 컴포넌트를 DOM에 추가하고, 상태를 초기화합니다.
  const $editor = document.createElement('form');
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
    onChange: async title => {
      const nextState = {
        ...this.state,
        title,
      };
      this.setState(nextState);
      postTitle.setState(title);
      onEdit(this.state);
      await onUpdate(this.state);
    },
  });
  const $postContent = document.createElement('textarea');

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const { content } = this.state;
    $postContent.value = content;
    postTitle.setState(this.state.title);
  };

  this.render = () => {
    $editor.appendChild($postContent);
    $target.appendChild($editor);
  };

  $postContent.addEventListener('keyup', async e => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
    onEdit({ ...this.state });
    await onUpdate(this.state);
  });
}
