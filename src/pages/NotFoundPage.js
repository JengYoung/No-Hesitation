import { push } from '@/apis/router';
import Button from '@/components/common/Button';
import names from '@/utils/classNames';
import {
  _appendChilds,
  _createElemWithAttr,
  _renderChild,
} from '@/utils/customDOMMethods';

export default function NotFoundPage({ $target }) {
  const {
    notFoundPage,
    notFoundContainer,
    notFoundCircle,
    notFoundHead,
    notFoundContent,
    notFoundGoHomeButton,
  } = names;
  const $page = _createElemWithAttr('div', [notFoundPage]);
  const $notFound = _createElemWithAttr('section', [notFoundContainer]);

  const $circle = _createElemWithAttr('div', [notFoundCircle]);
  const $img = _createElemWithAttr('img');
  $img.src =
    'https://images.velog.io/images/young_pallete/post/66206a69-8d47-4c7c-aff1-2fbce5045155/pat.gif';

  const $notFoundText = _createElemWithAttr('span', [notFoundHead], '404');
  const $notFoundContent = _createElemWithAttr(
    'span',
    [notFoundContent],
    '찾을 수 없는 주소에요!',
  );

  _appendChilds($circle, $img);
  _appendChilds($notFound, $notFoundText, $notFoundContent);
  new Button({
    $target: $notFound,
    attributes: {
      classNames: [notFoundGoHomeButton],
      text: '홈 화면으로 돌아가기',
    },
    onClick: () => {
      push('/');
    },
  });

  this.render = () => {
    _appendChilds($notFound, $circle);

    _renderChild($page, $notFound);
    _renderChild($target, $page);
  };
  this.render();
}
