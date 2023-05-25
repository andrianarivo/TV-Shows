export const storeAppId = (appId) => {
  localStorage.setItem('JSCapstoneAppID', appId);
};

export const getStoredAppId = () => localStorage.getItem('JSCapstoneAppID');

export const storeMovies = (movies) => {
  localStorage.setItem('movies', JSON.stringify(movies));
};
