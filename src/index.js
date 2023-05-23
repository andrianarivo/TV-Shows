import MovieStore from './modules/movieStore.js';
import './style.scss';
import { renderModal, hideModal } from './modules/toggleModal.js';

const closeModal = document.getElementById('close-button');


document.addEventListener('click', (e) => {
  e.preventDefault();
  renderModal(e);
});
closeModal.addEventListener('click', () => {
  hideModal();
});

const movieStore = new MovieStore();

const main = document.querySelector('main');
main.innerHTML = movieStore.render();

