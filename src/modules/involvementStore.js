import {
  getStoredAppId,
  storeAppId,
  storeComments,
  storeLikes,
} from './storage.js';

const BASE_URL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

export default class InvolvementStore {
  constructor() {
    this.makeAppId();
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
      return JSON.parse(likesText);
    }
    return likesText;
  }

  async addLike(movieId) {
    const response = await fetch(`${BASE_URL}/${this.appId}/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_id: movieId,
      }),
    });
    return response;
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
    if (data.error.status === 400) {
      console.log('no comments on this id');
    } else storeComments(commentsText);
    // if (commentsText !== '') {
    // storeComments(commentsText);
    // const data = await JSON.parse(commentsText);
    // return data;
    // }
    // return data;
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
