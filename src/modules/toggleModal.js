import MovieStore from './movieStore.js';

const movieStore = new MovieStore();

const modal = document.querySelector('section');

export const renderModal = (e) => {
  e.target.className.includes('button');
  if (e.target.className.includes('button')) {
    modal.style.display = 'block';
  }
  // console.log(e.target.id);
};

export const hideModal = () => {
  modal.style.display = 'none';
};

export const createModal = (movieIndex) => {
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalSummary = document.getElementById('modal-summary');
  const { moviesArray } = movieStore;
  const { id, summary, name } = moviesArray[movieIndex];
  const modalId = id;
  modalImage.alt = modalId;

  modalName.innerText = name;
  modalSummary.innerHTML = summary;
  const { image } = moviesArray[movieIndex];
  const { medium } = image;
  const mediumImage = medium;
  modalImage.src = mediumImage;
};
