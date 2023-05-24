import { fetchComments,  postComments  } from './http.js';
import { storeComments,  } from './storage.js';

export default class InvolvementStore {
  movieComments = [];

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
