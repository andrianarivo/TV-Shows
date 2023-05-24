import InvolvementStore from './modules/involvementStore.js';
import MovieStore from './modules/movieStore.js';

import { createModal, hideModal, renderModal } from './modules/toggleModal.js';
import './style.scss';

const movieStore = new MovieStore();
await movieStore.getData();
const involvementStore = new InvolvementStore();

const closeModal = document.getElementById('close-button');
const main = document.querySelector('main');
main.innerHTML = movieStore.render();

document.addEventListener('click', async (e) => {
  e.preventDefault();

  if (e.target.classList.contains('comment-button')) {
    renderModal(e);
    const movieIndex = e.target.id - 1;
    createModal(movieIndex, movieStore);
  }

  if (e.target.classList.contains('fa-heart')) {
    await involvementStore.addLike(e.target.dataset.id);
    await involvementStore.getLikes();
  }
});

closeModal.addEventListener('click', () => {
  hideModal();
});
