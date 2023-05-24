import {
  getStoredAppId,
  storeAppId,
  storeComments,
  storeLikes,
} from './storage.js';

const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export default class InvolvementStore {
  moviesLiked = [];

  async initialize() {
    await this.makeAppId();
    await this.getLikes();
  }

  async makeAppId() {
    this.appId = getStoredAppId();
    if (!this.appId) {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      this.appId = await response.text();
      storeAppId(this.appId);
    }
  }

  async getLikes() {
    const likes = await fetch(`${BASE_URL}/${this.appId}/likes/`, {
      method: 'GET',
    });
    const likesText = await likes.text();
    if (likesText !== '') {
      storeLikes(likesText);
      this.moviesLiked = JSON.parse(likesText);
    }
  }

  getLikesCount(movieId) {
    const movie = this.moviesLiked.filter(
      (movieLiked) => Number(movieId) === Number(movieLiked.item_id)
    );
    return (movie[0] && movie[0].likes) ?? 0;
  }

  async addLike(movieId) {
    await fetch(`${BASE_URL}/${this.appId}/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: movieId,
      }),
    });
    await this.getLikes();
  }

  async getComments(movieId) {
    const comments = await fetch(
      `${BASE_URL}/${this.appId}/comments?item_id=${movieId}`,
      {
        method: 'GET',
      }
    );

    const commentsText = await comments.text();
    const data = await JSON.parse(commentsText);
    if (!data.error) {
      storeComments(commentsText);
    }
  }

  async addComments(movieId, name, body) {
    const comments = await fetch(`${BASE_URL}/${this.appId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: movieId,
        username: name,
        comment: body,
      }),
    });
    return comments;
  }
}
