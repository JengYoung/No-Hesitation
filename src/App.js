import PostForm from './components/PostForm.js';
import SideBar from './components/SideBar.js';

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

  new PostForm({
    $target,
    initialState: {
      title: '테스트합니다',
      content: '테스트 중이에요!',
    },
  });
}
