const fetch = require('node-fetch');

const url = 'https://www.reddit.com/r/cassetteculture/top/?sort=top&t=all';

function searchReddit() {
  return fetch(url)
    .then(response => response.text());
}

searchReddit()
  .then(body => {
    console.log(body);
  });