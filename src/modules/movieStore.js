const fetchResult = await fetch('https://api.tvmaze.com/shows');
const jsonResult = await fetchResult.json();

export default class MovieStore {
  constructor() {
    this.moviesArray = jsonResult.slice(0, 12);
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
        <button class="comment-button" id=${movie.id} data-target="#model-window">Comments</button>
      </div>`;
    });

    return content;
  }
}
