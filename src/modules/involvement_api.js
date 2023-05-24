const appId = 'qK3z1QXp5g0btOAdCguF';
const baseUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export const getLikes = async () => {
  console.log('getlikes started..');
  const likes = await fetch(`${baseUrl}/${appId}/likes/`, { method: 'GET' });
  // debugger;
  // const likesJSON = likes.json();
  const likesText = likes.text();
  // console.log(likesJSON);
  console.log(likesText);

  return likesText;
};

// export default { getLikes };
