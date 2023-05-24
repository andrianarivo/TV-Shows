import { getStoredAppId, storeAppId, storeLikes } from './storage.js';

const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export const makeAppId = async () => {
  let id = getStoredAppId();
  if (!id) {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const appId = await response.text();
    id = appId;
    storeAppId(appId);
  }
  return id;
};

export const getLikes = async () => {
  const appId = await makeAppId();
  const likes = await fetch(`${BASE_URL}/${appId}/likes/`, { method: 'GET' });
  const likesText = await likes.text();
  if (likesText !== '') {
    storeLikes(likesText);
    return JSON.parse(likesText);
  }
  return likesText;
};

export const addLike = async (movieId) => {
  const appId = await makeAppId();
  const response = await fetch(`${BASE_URL}/${appId}/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
    }),
  });
  return response;
};
