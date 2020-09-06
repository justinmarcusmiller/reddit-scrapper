const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/';

function getResults() {
  return fetch(url)
    .then(response => response.text());
}

getResults()
  .then(body => {
    const $ = cheerio.load(body);
    $('.ipc-poster-card__title').each(function(i, element) {
      const $element = $(element);
      console.log($element.text())
    })
  })