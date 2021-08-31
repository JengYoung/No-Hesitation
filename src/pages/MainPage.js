import request from '../apis/request.js';
import Header from '../components/common/Header.js';
import SideBar from '../components/SideBar.js';

/*
  {
    username: string
    documents: [<object>]
  }
*/
export default function MainPage({
  $target,
  initialState = { username: '', documents: [] },
  onClick,
}) {
  this.state = initialState;

  const $page = new DocumentFragment();
  const sideBar = new SideBar({
    $target: $page,
    initialState,
    onClick,
  });

  const header = new Header({
    $target: $page,
    headerSize: 'h5',
    initialState: {
      content: this.state.username,
    },
  });

  this.setState = () => {
    const posts = request();
    this.state = {
      ...this.state,
      documents: posts,
    };

    const { username, documents } = this.state;
    header.setState({ content: username });
    sideBar.setState({
      username,
      documents,
    });

    this.render();
  };

  this.render = () => {
    console.log('요기', $page.childNodes);
    $target.appendChild($page);
  };
}
