import SideBar from './components/SideBar.js';
import PostEditPage from './pages/PostEditPage.js';

export default function App({ $target }) {
  new SideBar({
    $target,
    initialState: {
      username: 'jengyoung',
      documents: [
        {
          id: 1, // Document id
          title: '노션을 만들자', // Document title
          documents: [
            {
              id: 2,
              title: '블라블라',
              documents: [
                {
                  id: 3,
                  title: '함냐함냐',
                  documents: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          title: 'hello!',
          documents: [],
        },
      ],
    },
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
      postInfo: {
        title: '',
        content: '',
      },
    },
  });
  postEditPage.render();
}
