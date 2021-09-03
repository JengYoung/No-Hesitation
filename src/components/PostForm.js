import names from '../utils/classNames.js';
import { _createElemWithAttr } from '../utils/customDOMMethods.js';
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
  const { postForm, postTitle: postTitleClassName, editor } = names;

  const $postForm = _createElemWithAttr('form', [postForm]);
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
    $target: $postForm,
    classNames: [postTitleClassName],
    initialState: { title: this.state.title },
    onChange: async ({ title }) => {
      const nextState = {
        ...this.state,
        title,
      };
      this.setState(nextState);
      postTitle.setState({ title });
      onEdit(this.state);
      await onUpdate(this.state);
    },
  });
  const $editor = _createElemWithAttr('textarea', [editor]);

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const { content } = this.state;
    $editor.value = content;
    postTitle.setState({ title: this.state.title });
  };

  this.render = () => {
    $postForm.appendChild($editor);
    $target.appendChild($postForm);
    console.log('target', $target);
  };

  $editor.addEventListener('keyup', async e => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
    onEdit({ ...this.state });
    await onUpdate(this.state);
  });
}
