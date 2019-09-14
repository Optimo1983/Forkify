import axios from 'axios';
import { key1, key2, proxy } from '../config';

export default class Search {
   constructor(query) {
      this.query = query;
   }

   async getResults(query) {
      try {
         const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key2}&q=${this.query}`);
         this.result = res.data.recipes;
         //console.log(this.result);
      } catch(error) {
         alert(error);
      }
   }
}