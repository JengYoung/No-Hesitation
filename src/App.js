import router from './apis/router.js';
import MainPage from './pages/MainPage.js';
import PostEditPage from './pages/PostEditPage.js';
import { ROUTE_POST } from '../src/utils/constants.js';
import { _removeAllChildNodes } from './utils/customDOMMethods.js';

export default function App({ $target }) {
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      username: 'jengyoung',
      id: '',
      title: '',
      content: '',
      documents: [],
      createdAt: '',
      updatedAt: '',
    },
  });

  const mainPage = new MainPage({
    $target,
    initialState: {
      username: 'jengyoung',
      documents: [],
    },
    onClick: id => {
      history.pushState(null, null, ROUTE_POST + `/${id}`);
      this.route();
    },
  });

  this.route = () => {
    _removeAllChildNodes($target); // App 초기화
    const { pathname } = window.location;
    const splitedPath = pathname.split('/');

    if (pathname === undefined || pathname === '/') {
      mainPage.setState();
    } else if (pathname.indexOf(ROUTE_POST + '/') === 0) {
      const postId = splitedPath[2];
      postEditPage.setState({ id: postId });
    }
  };

  this.route();

  router(() => this.route());
}
