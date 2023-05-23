import movies from './tvshowapi.js';

export default class MovieStore {
  constructor() {
    this.moviesArray = movies;
  }

  render() {
    let content = '';
    this.moviesArray.forEach((movie) => {
      content += `<div class="card">
        <img class="card-banner" src="${movie.image.medium}" />
        <div class="card-body">
          <a class="movie-name">${movie.name}</a>
          <a class="like-button" href="#"><i class="far fa-heart"></i></a>
        </div>
        <p>5 likes</p>
        <button class="" id=${movie.id} data-target="#popup-wrapper">Comments</button>
      </div>`;
    });

    return content;
  }
}
