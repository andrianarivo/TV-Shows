import movies from './modules/TvShowApi.js';
import './style.scss';

const modal = document.querySelector('section');
const closeModal = document.getElementById('close-button');

let body = '';
movies.forEach((movie) => {
  body += `<div id="${movie.id}" class="card">
        <img src="#" />
        <a>${movie.name}</a>
        <i class="fa-regular fa-heart"></i>
        <p>5 likes</p>
        <button class="button" id=${movie.id} data-target="#popup-wrapper">Comments</button>
      </div>`;
});

const main = document.querySelector('main');
main.innerHTML = body;

document.addEventListener('click', (e) => {
  e.target.className.includes('button');
  if (e.target.className.includes('button')) {
    modal.style.display = 'block';
    console.log('clicked', e.target.id);
  }
});
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
