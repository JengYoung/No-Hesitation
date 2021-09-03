import getPostList from '@/apis/route/post/getPostList';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import names from '@/utils/classNames';
import { _createElemWithAttr } from '@/utils/customDOMMethods';

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
  const { mainPage } = names;
  this.state = initialState;
  const $page = _createElemWithAttr('div', [mainPage]);
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
