import checkState from '@/utils/checkState';
import names from '@/utils/classNames';
import { _createElemWithAttr } from '@/utils/customDOMMethods';

export default function Header({
  $target,
  initialState = {
    username: '',
  },
}) {
  this.state = initialState;

  const { headerBlock, userInfo, usernameMark } = names;
  const $header = _createElemWithAttr('header', [headerBlock]);
  const $userOptionBox = _createElemWithAttr('div', [userInfo]);
  const $usernameMark = _createElemWithAttr(
    'span',
    [usernameMark],
    `${this.state.username}님, 안녕하세요!`,
  );
  $userOptionBox.appendChild($usernameMark);
  $header.appendChild($userOptionBox);

  this.setState = nextState => {
    if (checkState(this.state, nextState)) {
      this.state = {
        ...this.state,
        ...nextState,
      };
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($header);
  };
}
