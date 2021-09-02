import request from '../../request.js';

const createPost = async (username, option = {}) => {
  console.log(
    await request(`/documents`, {
      options: { ...option, method: 'POST' },
      header: {
        'x-username': username,
      },
    }),
  );
};

export default createPost;
