import renderPosts from '../utils/renderPosts.js';
import Header from './common/Header.js';

export default function SideBar({ $target, initialState }) {
  const $sideBar = document.createElement('nav');
  $target.appendChild($sideBar);

  this.state = initialState;
  this.setState = nextState => {
    if (this.state.username !== nextState.username) {
      header.setState(nextState);
    }
    this.state = nextState;
    this.render();
  };

  const header = new Header({
    $target: $sideBar,
    headerSize: 'h5',
    initialState: this.state.username,
  });

  this.render = () => {
    const { documents } = this.state;
    renderPosts($sideBar, documents);
  };

  this.render();
}
