import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
   constructor(id) {
      this.id = id;
   }

   async getRecipe() {
      try {
         const res = await axios(`${proxy}http://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
         this.title = res.data.recipe.title;
         this.author = res.data.recipe.publisher;
         this.img = res.data.recipe.image_url;
         this.url = res.data.recipe.source_url;
         this.ingredients = res.data.recipe.ingredients;
      } catch(error) {
         console.log(error)
         alert('Something went wrong :(')
      }
   }

   calcTime() {
      // Assuming 15 min are needed for every 5 ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 5);
      this.time = periods * 15;
   }

   calcServings() {
      this.servings = 4;
   }
};