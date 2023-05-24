import MovieStore from './modules/movieStore.js';
import './style.scss';
import { renderModal, hideModal, createModal } from './modules/toggleModal.js';

const closeModal = document.getElementById('close-button');
const movieStore = new MovieStore();
const main = document.querySelector('main');
main.innerHTML = movieStore.render();

document.addEventListener('click', (e) => {
  e.preventDefault();
  renderModal(e);
  const movieIndex = e.target.id - 1;
  createModal(movieIndex, movieStore);
});

closeModal.addEventListener('click', () => {
  hideModal();
});
