import { main } from './DOMLoader.js';

const listOfMovies = (movieStore, involvementStore) => {
  main.innerHTML = movieStore.render(involvementStore);
};

export default listOfMovies;
