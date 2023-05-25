import { main } from './DOMLoader.js';

const listOfMovies = (movieStore) => {
  main.innerHTML = movieStore.render();
};

export default listOfMovies;
