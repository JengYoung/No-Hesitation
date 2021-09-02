import { ERROR_ETC } from '../utils/constants.js';

/**
 * @param {string} url
 * @param {object} username: string, options: object
 * @returns promise
 */

const { API_END_POINT } = process.env;
const { SIGHINMIDNIGHT } = process.env;
console.log(SIGHINMIDNIGHT);
const request = async (url, { options, header }) => {
  console.log(url, { options, header });
  if (!(typeof url === 'string')) return;
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        ...header,
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
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
