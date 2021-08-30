import MainPage from './pages/MainPage.js';
import PostEditPage from './pages/PostEditPage.js';

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
  });
  this.route = () => {
    while ($target.hasChildNodes()) {
      $target.removeChild($target.firstChild);
    }
    const { pathname } = window.location;
    const splitedPath = pathname.split('/');

    if (pathname === '/') {
      mainPage.setState();
    } else if (pathname.indexOf('/posts/') === 0) {
      const postId = pathname.split('/')[2];
      console.log(postId);
      postEditPage.setState({ postId });
    }
  };

  this.route();
}
