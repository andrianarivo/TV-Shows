import movies from './modules/TvShowApi.js';
import './style.scss';
import { renderModal, hideModal } from './modules/toggleModal.js';

const closeModal = document.getElementById('close-button');

let body = '';
movies.forEach((movie) => {
  body += `<div id="${movie.id}" class="card">
        <img src="#" />
        <a>${movie.name}</a>
        <i class="fa-regular fa-heart"></i>
        <p>5 likes</p>
        <button class="button" id=${movie.id} data-target="">Comments</button>
      </div>`;
});

const main = document.querySelector('main');
main.innerHTML = body;

document.addEventListener('click', (e) => {
  e.preventDefault();
  renderModal(e);
});
closeModal.addEventListener('click', () => {
  hideModal();
});
