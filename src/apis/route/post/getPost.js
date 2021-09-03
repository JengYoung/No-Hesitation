import request from '@/apis/request';

const getPost = async (id, username, option = {}) => {
  return await request(`/documents/${id}`, {
    options: { ...option, method: 'GET' },
    header: {
      'x-username': username,
    },
  });
};

export default getPost;
