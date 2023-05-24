import { logoTitle } from './DOMLoader.js';

const countItems = (movieStore) => {
  logoTitle.innerHTML = `TV Shows (${movieStore.getItemsCount()})`;
};

export default countItems;
