import getPostList from '../apis/route/post/getPostList.js';
import Header from '../components/Header.js';
import SideBar from '../components/SideBar.js';
import names from '../utils/classNames.js';
import { _createElemWithAttr } from '../utils/customDOMMethods.js';

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
  const { page } = names;
  this.state = initialState;

  const $page = _createElemWithAttr('div', [page]);
  const header = new Header({
    $target: $page,
    initialState: {
      username: this.state.username,
    },
  });
  const sideBar = new SideBar({
    $target: $page,
    initialState,
    onClick,
  });

  this.setState = async () => {
    const posts = await getPostList(this.state.username);
    this.state = {
      ...this.state,
      documents: posts,
    };

    const { username, documents } = this.state;
    header.setState({ username });
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
