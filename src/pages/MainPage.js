import request from '../apis/request.js';
import SideBar from '../components/SideBar.js';

/*
  {
    username: string
    documents: [<object>]
  }
*/
export default function MainPage({
  $target,
  initialState = { username: '', documents: ['여기'] },
}) {
  this.state = initialState;

  const $page = new DocumentFragment();
  const sideBar = new SideBar({
    $target: $page,
    initialState,
  });

  this.setState = () => {
    const posts = request();

    this.state = {
      ...this.state,
      documents: posts,
    };

    const { username, documents } = this.state;
    sideBar.setState({
      username,
      documents,
    });

    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
