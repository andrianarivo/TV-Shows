// import MovieStore from './movieStore.js';

// const movieStore = new MovieStore();

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

export const createModal = (i, movieStore) => {
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalSummary = document.getElementById('modal-summary');

  const movie = movieStore.get(i);
  const { id, summary, name, image } = movie;
  const modalId = id;
  modalImage.alt = modalId;

  modalName.innerText = name;
  modalSummary.innerHTML = summary;
  // const { image } = moviesArray[i];
  const { medium } = image;
  const mediumImage = medium;
  modalImage.src = mediumImage;
};
