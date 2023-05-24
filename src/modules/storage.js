export const storeAppId = (appId) => {
  localStorage.setItem('JSCapstoneAppID', appId);
};

export const storeLikes = (likesText) => {
  localStorage.setItem('likes', likesText);
};

export const getStoredAppId = () => localStorage.getItem('JSCapstoneAppID');

export const storeComments = (commentsText) => {
  localStorage.setItem('comments', commentsText);
};
