import {
  fetchComments,
  fetchLikes,
  fetchMovies,
  postComments,
  postLike,
} from './http.js';
import { storeMovies } from './storage.js';

export default class MovieStore {
  async getData() {
    const movies = await fetchMovies();
    this.moviesArray = movies.slice(0, 48);
    await this.getLikes();
  }

  async getLikes() {
    const likedMovies = await fetchLikes();
    this.moviesArray.forEach((movie) => {
      if (Array.isArray(likedMovies)) {
        likedMovies.forEach((likedMovie) => {
          if (Number(movie.id) === Number(likedMovie.item_id)) {
            movie.likes = likedMovie.likes;
          }
        });
      }
    });
    storeMovies(this.moviesArray);
  }

  async addLike(movieId) {
    await postLike(movieId);
    await this.getLikes();
  }

  get(index) {
    const movies = this.moviesArray.filter(
      (movie) => Number(movie.id) === Number(index)
    );
    return movies[0];
  }

  getItemsCount() {
    return this.moviesArray.length;
  }

  async getComments(movieId) {
    const movies = this.moviesArray.filter(
      (movie) => Number(movie.id) === Number(movieId)
    );
    const newComments = await fetchComments(movieId);
    const commentsText = await newComments.text();
    const data = await JSON.parse(commentsText);
    if (!data.error) {
      movies[0].comments = JSON.parse(commentsText);
    }
    storeMovies(this.moviesArray);
    return movies[0].comments;
  }

  async addComments(movieId, name, comment) {
    await postComments(movieId, name, comment);
    await this.getComments(movieId);
  }

  render() {
    let content = '';
    this.moviesArray.forEach((movie) => {
      content += `
      <div class="card-container">
        <div class="card">
          <img class="card-banner" src="${movie.image.medium}" />
          <div class="card-body">
            <a class="movie-name">${movie.name}</a>
            <i class="like-button fas fa-heart" data-id=${movie.id}></i>
          </div>
          <p>${movie.likes ?? 0} likes</p>
          <button class="comment-button" data-id=${
            movie.id
          } data-target="#model-window">Comments <i class="fas fa-plus"></i></button>
        </div>
      </div>
    `;
    });

    return content;
  }
}
