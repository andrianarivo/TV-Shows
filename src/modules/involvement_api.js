const appId = 'qK3z1QXp5g0btOAdCguF';
const baseUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

const getLikes = async () => {
  const likes = await fetch(`${baseUrl}/${appId}/likes/`, { method: 'GET' });
  debugger;
  const likesJSON = await likes.json();
  return likesJSON;
};

export { getLikes };
