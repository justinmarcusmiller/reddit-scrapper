const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { argv } = require('process');
let city = process.argv[2];
let searchTerm = process.argv[3];

const url = `https://${city}.craigslist.org/search/sss?query=${searchTerm}&sort=date`;

if (process.argv[2] == null || process.argv[3] == null) {
  console.log("INVALID ARGUMENTS");
  console.log("node index.js city searchTerm");
  process.exit();
}

function getResults() {
  return fetch(url)
    .then(response => response.text());
}

getResults()
  .then(body => {
    const $ = cheerio.load(body);
    $('.result-title').each(function(i, element) {
      const $element = $(element);
      console.log($('.result-title').eq(i).text() + " | " + $('.result-meta').eq(i).find('.result-price').text())
    })
  })