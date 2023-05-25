import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import {
  closeModal,
  commentBox,
  commentBtn,
  username,
} from './modules/DOMLoader.js';
import countItems from './modules/countItems.js';
import listOfMovies from './modules/listOfMovies.js';
import {
  createModal,
  hideModal,
  renderComment,
  renderModal,
} from './modules/modal.js';
import MovieStore from './modules/movieStore.js';
import './style.scss';

// ==========================
// |     INITIAL VALUES     |
// ==========================
const movieStore = new MovieStore();
await movieStore.getData();

countItems(movieStore);
listOfMovies(movieStore);

// =========================
// |        EVENTS         |
// =========================
document.addEventListener('click', async (e) => {
  e.preventDefault();

  if (e.target.classList.contains('comment-button')) {
    const movieId = e.target.dataset.id;
    const comments = await movieStore.getComments(movieId);
    renderModal(e);
    renderComment(comments);
    const movieIndex = movieId;
    createModal(movieIndex, movieStore);
  }

  if (e.target.classList.contains('like-button')) {
    await movieStore.addLike(e.target.dataset.id);
    await listOfMovies(movieStore);
  }
});

closeModal.addEventListener('click', () => {
  hideModal();
});

commentBtn.addEventListener('click', async (e) => {
  const movieId = e.target.dataset.id;
  await movieStore.addComments(movieId, username.value, commentBox.value);
  const comments = await movieStore.getComments(movieId);
  renderComment(comments);
  username.value = '';
  commentBox.value = '';
  createModal(movieId, movieStore);
});
