import { getLikes } from './modules/involvement_api.js';
import MovieStore from './modules/movieStore.js';
import { createModal, hideModal, renderModal } from './modules/toggleModal.js';
import './style.scss';

const movieStore = new MovieStore();
await movieStore.getData();

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
    const likes = await getLikes();
    console.log('likes', likes);
  }
});

closeModal.addEventListener('click', () => {
  hideModal();
});
