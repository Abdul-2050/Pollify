// netlify/functions/scrape.js

const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  try {
    // Make an HTTP GET request to the target website
    const response = await axios.get('https://www.cricketworldcup.com/standings');

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Select the elements with the "standings" class
    const standings = $('.standings');

    // Extract the text content of the standings elements
    const standingsData = standings.map((index, element) => $(element).text()).get();

    return {
      statusCode: 200,
      body: JSON.stringify(standingsData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while scraping data.' }),
    };
  }
};
