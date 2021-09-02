import request from '../../request.js';

const deletePost = async (username, id) => {
  return await request(`/documents/${id}`, {
    options: {
      method: 'DELETE',
    },
    header: {
      'x-username': username,
    },
  });
};

export default deletePost;
