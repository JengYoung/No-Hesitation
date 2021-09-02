import request from '../../request.js';

const createPost = async (username, body) => {
  console.log({
    options: { body: JSON.stringify(body), method: 'POST' },
    header: {
      'x-username': username,
    },
  });
  return await request(`/documents`, {
    options: { body: JSON.stringify(body), method: 'POST' },
    header: {
      'x-username': username,
    },
  });
};

export default createPost;
