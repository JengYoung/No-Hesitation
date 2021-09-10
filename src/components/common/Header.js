import { push } from '@/apis/router';
import checkState from '@/utils/checkState';
import names from '@/utils/classNames';
import {
  _createElemWithAttr,
  _appendChilds,
  _renderChild,
} from '@/utils/customDOMMethods';

export default function Header({
  $target,
  initialState = {
    username: '',
  },
}) {
  this.state = initialState; // 아직은 로그인, 로그아웃 기능을 구현하지 않았네요...!

  const { LOGO_URL } = process.env;
  const { headerBlock, logo, logoBox, userInfo, usernameMark, nameLogo } =
    names;
  const $header = _createElemWithAttr('header', [headerBlock]);
  const $userOptionBox = _createElemWithAttr('div', [userInfo]);
  const $usernameMark = _createElemWithAttr(
    'span',
    [usernameMark],
    `${this.state.username}님, 안녕하세요!`,
  );
  const $logoBox = _createElemWithAttr('div', [logoBox]);
  const $logo = _createElemWithAttr('img', [logo]);
  const $nameLogo = _createElemWithAttr('span', [nameLogo], 'no#tation');
  $logo.setAttribute('src', LOGO_URL);

  _appendChilds($logoBox, $logo, $nameLogo);
  $userOptionBox.appendChild($usernameMark);
  _appendChilds($header, $logoBox, $userOptionBox);

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
    _renderChild($target, $header, headerBlock);
  };

  this.render();

  $logoBox.addEventListener('click', () => {
    push('/');
  });
}
