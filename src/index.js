import movies from './modules/TvShowApi.js';
import './style.scss';

let body = '';
movies.forEach((movie) => {
  body += `<div class="card">
        <img src="#" />
        <a>${movie.name}</a>
        <i class="fa-regular fa-heart"></i>
        <p>5 likes</p>
        <button id=${movie.id} data-target="#popup-wrapper">Comments</button>
      </div>`;
});

const main = document.querySelector('main');
main.innerHTML = body;
