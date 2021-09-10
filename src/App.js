import router from '@/apis/router';
import MainPage from '@/pages/MainPage';
import PostEditPage from '@/pages/PostEditPage';
import { ROUTE_POST } from '@/utils/constants';
import { _removeAllChildNodes } from '@/utils/customDOMMethods';
import getPost from '@/apis/route/post/getPost';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App({ $target }) {
  const onClick = id => {
    history.pushState(null, null, ROUTE_POST + `/${id}`);
    this.route();
  };

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
    onClick,
  });

  const mainPage = new MainPage({
    $target,
    initialState: {
      username: 'jengyoung',
      documents: [],
    },
    onClick,
  });

  const notFoundPage = new NotFoundPage({
    $target,
  });

  this.route = async () => {
    _removeAllChildNodes($target); // App 초기화
    const { pathname } = window.location;
    const splitedPath = pathname.split('/');

    if (pathname === undefined || pathname === '/') {
      mainPage.setState();
    } else if (pathname.indexOf(ROUTE_POST + '/') === 0) {
      const postId = splitedPath[2];
      postEditPage.setState(await getPost(postId, 'jengyoung'));
    } else {
      notFoundPage.render();
    }
  };

  this.route();

  router(() => this.route());
}
