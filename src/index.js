import movies from './modules/tvshowapi.js';
import './style.scss';

let body = '';
movies.forEach((movie) => {
  body += `<div class="card">
        <img class="card-banner" src="${movie.image.medium}" />
        <div class="card-body">
          <a class="movie-name">${movie.name}</a>
          <a class="like-button" href="#"><i class="far fa-heart"></i></a>
        </div>
        <p>5 likes</p>
        <button class="comment-button" id=${movie.id} data-target="#popup-wrapper">Comments</button>
      </div>`;
});

const main = document.querySelector('main');
main.innerHTML = body;
