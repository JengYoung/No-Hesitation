import names from '@/utils/classNames';
import {
  _createElemWithAttr,
  _removeAllChildNodes,
  _renderChild,
} from '@/utils/customDOMMethods';

export default function Breadcrumb({ $target, initialState, onClick }) {
  this.state = initialState;
  const { breadcrumb, breadcrumbLink, breadcrumbSeparator } = names;

  const $breadcrumb = _createElemWithAttr('ul', [breadcrumb]);

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    _removeAllChildNodes($breadcrumb);
    const $fragment = new DocumentFragment();
    this.state.paths.map(([id, title], idx) => {
      const $breadcrumbLink = _createElemWithAttr('li', [breadcrumbLink]);
      const $breadcrumbtitle = _createElemWithAttr('div', [], title);
      $breadcrumbLink.dataset.id = id;
      $breadcrumbLink.appendChild($breadcrumbtitle);
      $fragment.appendChild($breadcrumbLink);

      if (idx !== this.state.paths.length) {
        const $breadcrumbSeparator = _createElemWithAttr('div', [
          breadcrumbSeparator,
          '/',
        ]);
        $fragment.appendChild($breadcrumbSeparator);
      }
    });

    $breadcrumb.appendChild($fragment);
    _renderChild($target, $breadcrumb, breadcrumb);
  };

  this.render();

  $breadcrumb.addEventListener('click', e => {
    const closestBreadcrumbLink = e.target.closest(`.${breadcrumbLink}`);
    if (!closestBreadcrumbLink) return;
    onClick(closestBreadcrumbLink.dataset.id);
  });
}
