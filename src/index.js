import {
  closeModal,
  commentBox,
  commentBtn,
  username,
} from './modules/DOMLoader.js';
import addLike from './modules/addLike.js';
import countItems from './modules/countItems.js';
import InvolvementStore from './modules/involvementStore.js';
import listOfMovies from './modules/listOfMovies.js';
import MovieStore from './modules/movieStore.js';
import {
  renderComment,
  createModal,
  hideModal,
  renderModal,
} from './modules/toggleModal.js';
import './style.scss';

// =========================
// |     ENCAPSULATION     |
// =========================
const movieStore = new MovieStore();
await movieStore.getData();
const involvementStore = new InvolvementStore();
await involvementStore.getLikes();

countItems(movieStore);
listOfMovies(movieStore, involvementStore);

// =========================
// |        EVENTS         |
// =========================
document.addEventListener('click', async (e) => {
  e.preventDefault();

  if (e.target.classList.contains('comment-button')) {
    renderModal(e);
    const movieIndex = e.target.id - 1;
    createModal(movieIndex, movieStore);
  }

  if (e.target.classList.contains('like-button')) {
    addLike(movieStore, involvementStore, e.target.dataset.id);
  }
});

closeModal.addEventListener('click', () => {
  hideModal();
});

commentBtn.addEventListener('click', async (e) => {
  const movieId = e.target.dataset.id;
  await involvementStore.addComments(movieId, username.value, commentBox.value);
  const comments = await involvementStore.getComments(movieId);
  // addCommentTable();
  const commentsArray = JSON.parse(comments);
  renderComment(commentsArray);
  // console.log(comments);
  username.value = '';
  commentBox.value = '';
});
