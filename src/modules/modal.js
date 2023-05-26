import {
  commentsCounter,
  modal,
  modalButton,
  modalImage,
  modalName,
  modalSummary,
  table,
} from './DOMLoader.js';

export const renderModal = (e) => {
  e.target.className.includes('button');
  if (e.target.className.includes('button')) {
    modal.style.display = 'block';
  }
};

export const hideModal = () => {
  modal.style.display = 'none';
};

export const createModal = (i, movieStore) => {
  const movie = movieStore.get(i);
  const { id, summary, name, image, comments } = movie;
  const modalId = id;
  modalImage.alt = modalId;

  const commentsCount = comments ? comments.length : 0;
  commentsCounter.innerText = commentsCount;

  modalName.innerText = name;
  modalSummary.innerHTML = summary;
  const { medium } = image;
  const mediumImage = medium;
  modalImage.src = mediumImage;
  modalButton.dataset.id = id;
};

const addCommentTable = (date, name, comment) => {
  const commentTable = document.createElement('tr');
  commentTable.innerHTML = `
  <td>${date} <strong>${name}</strong> 👉</td>
  <td>${comment}</td>
  `;
  table.append(commentTable);
};

export const renderComment = (data) => {
  table.innerHTML = '';

  if (data) {
    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line camelcase
      const { creation_date, username, comment } = data[i];
      addCommentTable(creation_date, username, comment);
    }
  }
};
