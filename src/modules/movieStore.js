export default class MovieStore {
  async getData() {
    const fetchResult = await fetch('https://api.tvmaze.com/shows');
    const jsonResult = await fetchResult.json();
    this.moviesArray = jsonResult.slice(0, 12);
  }

  get(index) {
    return this.moviesArray[index];
  }

  render(involvementStore) {
    let content = '';
    this.moviesArray.forEach((movie) => {
      content += `<div class="card">
        <img class="card-banner" src="${movie.image.medium}" />
        <div class="card-body">
          <a class="movie-name">${movie.name}</a>
          <i class="like-button far fa-heart" data-id=${movie.id}></i>
        </div>
        <p>${involvementStore.getLikesCount(movie.id)} likes</p>
        <button class="comment-button" id=${
          movie.id
        } data-target="#model-window">Comments</button>
      </div>`;
    });

    return content;
  }
}
