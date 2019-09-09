// API Key: 72dbb3a144a6ec02a44efae7f45a906f
// Search API: https://www.food2fork.com/api/search
// Recipe API: https://www.food2fork.com/api/get
// Proxy: 

import axios from 'axios';

async function getResults(query) {
   const key = '72dbb3a144a6ec02a44efae7f45a906f';
   const proxy = 'https://cors-anywhere.herokuapp.com/'
   const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${query}`);
   const recipes = res.data.recipes;
   console.log(recipes);
}

getResults('pizza');

