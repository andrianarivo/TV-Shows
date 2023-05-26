const main = document.querySelector('main');
const commentBtn = document.getElementById('submit-comment');
const closeModal = document.getElementById('x-button');
const username = document.getElementById('form-username');
const commentBox = document.getElementById('comment-box');
const logoTitle = document.querySelector('.logo-title');

const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalSummary = document.getElementById('modal-summary');
const modalButton = document.getElementById('submit-comment');

const commentsCounter = document.getElementById('comments-counter');

const modal = document.querySelector('section');
const table = document.getElementById('table-body');

export {
  commentsCounter,
  modal,
  table,
  modalButton,
  modalSummary,
  modalName,
  modalImage,
  main,
  commentBtn,
  closeModal,
  username,
  commentBox,
  logoTitle,
};
