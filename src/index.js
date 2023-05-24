import InvolvementStore from './modules/involvementStore.js';
import MovieStore from './modules/movieStore.js';

import { createModal, hideModal, renderModal } from './modules/toggleModal.js';
import './style.scss';

const movieStore = new MovieStore();
await movieStore.getData();
const involvementStore = new InvolvementStore();
await involvementStore.makeAppId();

// const form = document.getElementsByTagName('form');
const commentBtn = document.getElementById('submit-comment');
const closeModal = document.getElementById('close-button');
const main = document.querySelector('main');
main.innerHTML = movieStore.render(involvementStore);

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

commentBtn.addEventListener('click', async (e) => {
  const movieId = e.target.dataset.id;
  const username = document.getElementById('form-username');
  const commentBox = document.getElementById('comment-box');
  await involvementStore.addComments(movieId, username.value, commentBox.value);
  await involvementStore.getComments(movieId);
  username.value = '';
  commentBox.value = '';
});
