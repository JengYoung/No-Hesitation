import { ERROR_ETC } from '../utils/constants.js';

export const API_END_POINT = 'https://kdt.roto.codes';

/**
 * @param {string} url
 * @param {object} username: string, options: object
 * @returns promise
 */
const request = async (url, { options = {}, headers }) => {
  if (!(typeof url === 'string')) return;
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers,
    });
    if (res.ok) {
      return await res.json();
    }

    throw new Error(ERROR_ETC);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
};
export default request;
