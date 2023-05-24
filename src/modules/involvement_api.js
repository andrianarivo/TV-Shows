const appId = 'FAGmJuYG6eUJ8BrXYXwa';
const baseUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export const getLikes = async () => {
  const likes = await fetch(`${baseUrl}/${appId}/likes/`, { method: 'GET' });
  const likesText = await likes.text();
  if (likesText !== '') {
    localStorage.setItem('likes', likesText);
    return JSON.parse(likesText);
  }

  return likesText;
};

export const addLike = async (movieId) => {
  const response = await fetch(`${baseUrl}/${appId}/likes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
    }),
  });

  return response;
};

// export default { getLikes };
