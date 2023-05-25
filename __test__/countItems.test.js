import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import MovieStore from '../src/modules/movieStore.js';

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('count the number of displayed items', () => {
  test('display items', async () => {
    // Arrange
    fetch.mockImplementation((url) => {
      if (url === 'https://api.tvmaze.com/shows') {
        return Promise.resolve(
          new Response(
            JSON.stringify([
              { id: 1, image: { medium: '#' }, name: 'Movie 1' },
              { id: 2, image: { medium: '#' }, name: 'Movie 2' },
            ])
          )
        );
      }
      return Promise.resolve(
        new Response(JSON.stringify([{ item_id: 1, likes: 5 }]))
      );
    });
    document.body.innerHTML = `
    <main></main>
  `;
    const mainContainer = document.querySelector('main');

    // Act
    const movieStore = new MovieStore();
    await movieStore.getData();

    // Assert
    mainContainer.innerHTML = movieStore.render();
    expect(mainContainer.children.length).toBe(movieStore.moviesArray.length);
  });
});
