import names from '@/utils/classNames';
import { _createElemWithAttr, _renderChild } from '@/utils/customDOMMethods';
import Input from '@/components/common/Input';

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
  const { postForm, postTitle: postTitleClassName, editor, titleBox } = names;
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

  const $titleBox = _createElemWithAttr('div', [titleBox]);
  const postTitle = new Input({
    $target: $titleBox,
    classNames: [postTitleClassName],
    placeholder: '제목을 입력해주세요! 😆',
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
  $postForm.appendChild($titleBox);

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
    _renderChild($postForm, $editor);
    _renderChild($target, $postForm);
  };

  this.render();
  $editor.addEventListener('keyup', async e => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
    onEdit({ ...this.state });
    await onUpdate(this.state);
  });
}
