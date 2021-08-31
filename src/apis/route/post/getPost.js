import request from '../../request.js';

const getPost = async (id, username, option = {}) => {
  console.log(id, username);
  return await request(`/documents/${id}`, {
    options: { ...option, method: 'GET' },
    headers: {
      'x-username': username,
    },
  });
};

export default getPost;
