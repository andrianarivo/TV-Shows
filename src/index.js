import MovieStore from './modules/movieStore.js';
import './style.scss';

const movieStore = new MovieStore();

const main = document.querySelector('main');
main.innerHTML = movieStore.render();
