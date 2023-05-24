import { fetchComments, fetchLikes, fetchMovies, postLike } from './http.js';
import { storeMovies } from './storage.js';

export default class MovieStore {
  async getData() {
    const movies = await fetchMovies();
    this.moviesArray = movies.slice(0, 12);
    await this.getLikes();
  }

  async getLikes() {
    const likedMovies = await fetchLikes();
    this.moviesArray.forEach((movie) => {
      likedMovies.forEach((likedMovie) => {
        if (Number(movie.id) === Number(likedMovie.item_id)) {
          movie.likes = likedMovie.likes;
        }
      });
    });
    storeMovies(this.moviesArray);
  }

  get(index) {
    return this.moviesArray[index];
  }

  getItemsCount() {
    return this.moviesArray.length;
  }

  async addLike(movieId) {
    await postLike(movieId);
    await this.getLikes();
  }

  async getComments(movieId) {
    const movies = this.moviesArray.filter(
      (movie) => Number(movie.id) === Number(movieId)
    );
    const { comments } = movies[0];
    if (comments) {
      return comments;
    }
    const newComments = await fetchComments(movieId);
    const commentsText = await newComments.text();
    const data = await JSON.parse(commentsText);
    if (!data.error) {
      movies[0].comments = JSON.parse(commentsText);
    }
    storeMovies(this.moviesArray);
    return movies[0].comments;
  }

  render() {
    let content = '';
    this.moviesArray.forEach((movie) => {
      content += `<div class="card">
        <img class="card-banner" src="${movie.image.medium}" />
        <div class="card-body">
          <a class="movie-name">${movie.name}</a>
          <i class="like-button far fa-heart" data-id=${movie.id}></i>
        </div>
        <p>${movie.likes ?? 0} likes</p>
        <button class="comment-button" id=${
          movie.id
        } data-target="#model-window">Comments</button>
      </div>`;
    });

    return content;
  }
}
