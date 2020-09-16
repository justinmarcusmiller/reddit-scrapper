// Initialize Variables
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { argv } = require('process');
// City and search term are defined by parameters
let city = process.argv[2];
let searchTerm = process.argv[3];
let results = [];

const url = `https://${city}.craigslist.org/search/sss?query=${searchTerm}&sort=date&srchType=T`;

// If user entered invalid parameters, the program will close
if (!process.argv[2] || !process.argv[3]) {
  console.log("Missing One Or More Parameter");
  console.log("Correct Usage: node index.js city searchTerm");
  process.exit();
} else if (process.argv[5]) {
  console.log("Too many parameters");
  console.log("Correct Usage: node index.js city searchTerm");
  process.exit();
}

// Scrap craigslist
function getResults() {
  return fetch(url)
    .catch((error) => {console.log("Error: city or search-term is invalid"), process.exit()}) 
    .then(response => response.text());
}

// Display results to user
getResults()
  .then(body => {
    const $ = cheerio.load(body);
    $('.result-title').each(function(i, element) {
      const $element = $(element);
      let result = `{"title":"${$('.result-title').eq(i).text()}","price":"${$('.result-meta').eq(i).find('.result-price').text()}","postLink":"${$('.result-info').eq(i).find('a').attr('href')}","location":"${$('.result-hood').eq(i).text()}"`;
      results.push(result);
    })
    if (results.length === 0) {
      console.log("No Results Found")
    } else {
      console.log(results);
    }
    
  })