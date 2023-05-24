export const storeAppId = (appId) => {
  localStorage.setItem('JSCapstoneAppID', appId);
};

export const storeLikes = (likesJSON) => {
  localStorage.setItem('likes', JSON.stringify(likesJSON));
};

export const getStoredAppId = () => localStorage.getItem('JSCapstoneAppID');

export const storeComments = (commentsText) => {
  localStorage.setItem('comments', commentsText);
};

export const storeMovies = (movies) => {
  localStorage.setItem('movies', JSON.stringify(movies));
};
