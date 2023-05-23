const modal = document.querySelector('section');

export const renderModal = (e) => {
  e.target.className.includes('button');
  if (e.target.className.includes('button')) {
    modal.style.display = 'block';
    console.log('clicked', e.target.id);
  }
};

export const hideModal = () => {
  modal.style.display = 'none';
};
