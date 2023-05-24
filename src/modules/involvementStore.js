import { getStoredAppId, storeAppId, storeLikes } from './storage.js';

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
}
