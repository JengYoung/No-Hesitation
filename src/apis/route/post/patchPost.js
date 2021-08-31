import request from '../../request.js';
const updatePost = async (id, username, options = {}) => {
  const { title, content } = options.body;
  const nowTitle = title ?? null;
  const nowContent = content ?? null;
  if (!nowTitle || !nowContent) return;

  return await request(`/documents/${id}`, {
    options: {
      ...options,
      method: 'PUT',
    },
    header: {
      'x-username': username,
    },
  });
};

export default updatePost;
