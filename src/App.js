import router from './apis/router.js';
import MainPage from './pages/MainPage.js';
import PostEditPage from './pages/PostEditPage.js';
import { READ_POST_ROUTE } from '../src/utils/constants.js';
import removeAllChildNodes from './utils/removeAllChildNodes.js';

export default function App({ $target }) {
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
    },
  });

  const mainPage = new MainPage({
    $target,
    initialState: {
      username: 'jengyoung',
      documents: [],
    },
    onClick: id => {
      console.log(READ_POST_ROUTE + `/${id}`);
      history.pushState(null, null, READ_POST_ROUTE + `/${id}`);
      this.route();
    },
  });

  this.route = () => {
    removeAllChildNodes($target); // App 초기화
    const { pathname } = window.location;
    const splitedPath = pathname.split('/');

    if (pathname === undefined || pathname === '/') {
      mainPage.setState();
    } else if (pathname.indexOf(READ_POST_ROUTE + '/') === 0) {
      const postId = splitedPath[2];
      postEditPage.setState({ postId });
    }
  };

  this.route();

  router(() => this.route());
}
