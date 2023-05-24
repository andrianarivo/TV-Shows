const modal = document.querySelector('section');
const table = document.getElementById('table-body');

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
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalSummary = document.getElementById('modal-summary');
  const modalButton = document.getElementById('submit-comment');

  const movie = movieStore.get(i);
  const { id, summary, name, image } = movie;
  const modalId = id;
  modalImage.alt = modalId;

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
  // eslint-disable-next-line camelcase
  // data.forEach(({ comment, creation_date, username }) => {
  //   console.log(comment);
  //   console.log(username);
  //   console.log(creation_date);
  //   addCommentTable(creation_date, username, comment);
  // });

  for (let i = 0; i < data.length; i += 1) {
    // eslint-disable-next-line camelcase
    const { creation_date, username, comment } = data[i];
    addCommentTable(creation_date, username, comment);
  }
};
