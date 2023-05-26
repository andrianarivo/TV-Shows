export const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/abXbQnqOSQBek76Wke6s';

const fetchMovies = async () => {
  const movies = await fetch('https://api.tvmaze.com/shows');
  return movies.json();
};

const fetchLikes = async () => {
  const likes = await fetch(`${BASE_URL}/likes/`, {
    method: 'GET',
  });
  const likesText = await likes.text();
  if (likesText && likesText !== '') {
    return JSON.parse(likesText);
  }
  return likesText;
};

const postLike = async (movieId) => {
  await fetch(`${BASE_URL}/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
    }),
  });
};

const fetchComments = async (movieId) => {
  const comments = await fetch(
    `${BASE_URL}/comments?item_id=${movieId}`,
    {
      method: 'GET',
    }
  );
  return comments;
};

const postComments = async (movieId, name, body) => {
  const comments = await fetch(`${BASE_URL}/comments`, {
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
  fetchLikes,
  postLike,
  fetchComments,
  postComments,
};
