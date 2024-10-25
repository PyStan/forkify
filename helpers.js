import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
    // console.log(res);
    const data = await res.json();
    console.log('In the Helpers.js');
    console.log(data);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`${errorData.message} ${res.status}`);
    }

    return data;
  } catch (err) {
    console.log('error', err);
    throw err;
  }
};
