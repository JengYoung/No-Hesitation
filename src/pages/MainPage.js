import getPostList from '../apis/route/post/getPostList.js';
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

  this.setState = async () => {
    const posts = await getPostList(this.state.username);
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
    $target.appendChild($page);
  };
}
