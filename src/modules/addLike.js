import listOfMovies from './listOfMovies.js';

const addLike = async (movieStore, involvementStore, id) => {
  await involvementStore.addLike(id);
  listOfMovies(movieStore, involvementStore);
};

export default addLike;
