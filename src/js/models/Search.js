import axios from 'axios';

export default class Search {
   constructor(query) {
      this.query = query;
   }

   async getResults(query) {
      try {
         const key = '72dbb3a144a6ec02a44efae7f45a906f';
         const proxy = 'https://cors-anywhere.herokuapp.com/'
         const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
         this.result = res.data.recipes;
         //console.log(this.result);
      } catch(error) {
         alert(error);
      }
      
   }
}