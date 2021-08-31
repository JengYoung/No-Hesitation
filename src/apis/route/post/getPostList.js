import request from '../../request.js';

const getPostList = async (username, option = {}) => {
  return await request('/documents', {
    options: { ...option, method: 'GET' },
    header: {
      'x-username': username,
    },
  });
};

export default getPostList;
