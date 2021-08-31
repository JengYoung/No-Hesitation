import request from '../../request.js';
const updatePost = async (id, username, body) => {
  const { title, content } = body;
  const nowTitle = title ?? null;
  const nowContent = content ?? null;
  if (!nowTitle || !nowContent) return;

  console.log(id, username, body);
  return await request(`/documents/${id}`, {
    options: {
      body: JSON.stringify(body),
      method: 'PUT',
    },
    header: {
      'x-username': username,
    },
  });
};

export default updatePost;
