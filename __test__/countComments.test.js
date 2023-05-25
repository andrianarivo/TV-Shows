import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { BASE_URL } from '../src/modules/http';
import MovieStore from '../src/modules/movieStore';

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('count the number of comments', () => {
  test('display comments', async () => {
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
      if (url.includes(BASE_URL)) {
        return Promise.resolve(
          new Response(
            JSON.stringify([
              {
                comment: 'This is nice!',
                creation_date: '2021-01-10',
                username: 'John',
              },
              {
                comment: 'Great content!',
                creation_date: '2021-02-10',
                username: 'Jane',
              },
            ])
          )
        );
      }

      return Promise.resolve(
        new Response(JSON.stringify([{ item_id: 1, likes: 5 }]))
      );
    });

    // Act
    const movieStore = new MovieStore();
    await movieStore.getData();
    const comments = await movieStore.getComments(1);

    // Assert
    expect(Number(comments.length)).toBe(2);
  });
});
