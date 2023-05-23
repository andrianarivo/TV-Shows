const fetchResult = await fetch('https://api.tvmaze.com/shows');
const jsonResult = await fetchResult.json();

export default jsonResult.slice(0, 12);
