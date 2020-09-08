// Initialize Variables
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { argv } = require('process');
// City and search term are defined by parameters
let city = process.argv[2];
let searchTerm = process.argv[3];

const url = `https://${city}.craigslist.org/search/sss?query=${searchTerm}&sort=date`;

// If user entered invalid parameters, the program will close
if (process.argv[2] == null || process.argv[3] == null) {
  console.log("INVALID ARGUMENTS");
  console.log("node index.js city searchTerm");
  process.exit();
}

// Scrap craigslist
function getResults() {
  return fetch(url)
    .then(response => response.text());
}

// Display results to user
getResults()
  .then(body => {
    const $ = cheerio.load(body);
    $('.result-title').each(function(i, element) {
      const $element = $(element);
      console.log($('.result-title').eq(i).text() + " | " + $('.result-meta').eq(i).find('.result-price').text())
    })
  })