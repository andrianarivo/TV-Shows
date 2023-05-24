import { fetchComments, fetchLikes, postComments, postLike } from './http.js';
import { storeComments, storeLikes } from './storage.js';

export default class InvolvementStore {
  moviesLiked = [];

  movieComments = [];

  async getLikes() {
    const likes = await fetchLikes();
    const likesText = await likes.text();
    if (likesText !== '') {
      storeLikes(likesText);
      this.moviesLiked = JSON.parse(likesText);
    }
    return this.moviesLiked;
  }

  getLikesCount(movieId) {
    const movie = this.moviesLiked.filter(
      (movieLiked) => Number(movieId) === Number(movieLiked.item_id)
    );
    return (movie[0] && movie[0].likes) ?? 0;
  }

  async addLike(movieId) {
    await postLike(movieId);
    await this.getLikes();
  }

  async getComments(movieId) {
    this.movieComments = [];
    const comments = await fetchComments(movieId);
    const commentsText = await comments.text();
    const data = await JSON.parse(commentsText);
    if (!data.error) {
      storeComments(commentsText);
      this.movieComments = JSON.parse(commentsText);
    }
    return this.movieComments;
  }

  async addComments(movieId, name, body) {
    this.movieComments = [];
    const comments = await postComments(movieId, name, body);
    return comments;
  }
}
