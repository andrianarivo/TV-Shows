import fetchMock from 'jest-fetch-mock';
import InvolvementStore from '../src/modules/involvementStore.js';
import MovieStore from '../src/modules/movieStore.js';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('count the number of displayed items', () => {
  test('display items', async () => {
    // Arrange
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { id: 1, image: { medium: '#' }, name: 'Movie 1' },
        { id: 2, image: { medium: '#' }, name: 'Movie 2' },
      ])
    );
    document.body.innerHTML = `
    <main></main>
  `;
    const mainContainer = document.querySelector('main');

    // Act
    const movieStore = new MovieStore();
    await movieStore.getData();
    const involvementStore = new InvolvementStore();
    involvementStore.getLikes();

    // Assert
    mainContainer.innerHTML = movieStore.render(involvementStore);
    expect(mainContainer.children.length).toBe(movieStore.moviesArray.length);
  });
});
