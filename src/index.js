import { getLikes } from './modules/involvement_api.js';
import MovieStore from './modules/movieStore.js';
import { createModal, hideModal, renderModal } from './modules/toggleModal.js';
import './style.scss';

const movieStore = new MovieStore();
await movieStore.getData();

const closeModal = document.getElementById('close-button');
const main = document.querySelector('main');
main.innerHTML = movieStore.render();

document.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('comment-button')) {
    renderModal(e);
    const movieIndex = e.target.id - 1;
    createModal(movieIndex, movieStore);
  }
});

closeModal.addEventListener('click', () => {
  hideModal();
});
