import { getStoredAppId, storeAppId } from './storage.js';

const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const fetchMovies = async () => {
  const movies = await fetch('https://api.tvmaze.com/shows');
  return movies.json();
};

const fetchAppId = async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.text();
};

const getAppId = async () => {
  let appId = getStoredAppId();
  if (!appId) {
    appId = await fetchAppId();
    storeAppId(appId);
  }
  return appId;
};

const fetchLikes = async () => {
  const appId = await getAppId();
  const likes = await fetch(`${BASE_URL}/${appId}/likes/`, {
    method: 'GET',
  });
  return likes;
};

const postLike = async (movieId) => {
  const appId = await getAppId();
  await fetch(`${BASE_URL}/${appId}/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
    }),
  });
};

const fetchComments = async (movieId) => {
  const appId = await getAppId();
  const comments = await fetch(
    `${BASE_URL}/${appId}/comments?item_id=${movieId}`,
    {
      method: 'GET',
    }
  );
  return comments;
};

const postComments = async (movieId, name, body) => {
  const appId = await getAppId();
  const comments = await fetch(`${BASE_URL}/${appId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
      username: name,
      comment: body,
    }),
  });
  return comments;
};

export {
  fetchMovies,
  fetchAppId,
  fetchLikes,
  postLike,
  fetchComments,
  postComments,
};
