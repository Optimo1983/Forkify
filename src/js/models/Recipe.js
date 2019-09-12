import axios from 'axios';
import { key1, key2, proxy } from '../config';

export default class Recipe {
   constructor(id) {
      this.id = id;
   }

   async getRecipe() {
      try {
         const res = await axios(`${proxy}http://www.food2fork.com/api/get?key=${key1}&rId=${this.id}`);
         this.title = res.data.recipe.title;
         this.author = res.data.recipe.publisher;
         this.img = res.data.recipe.image_url;
         this.url = res.data.recipe.source_url;
         this.ingredients = res.data.recipe.ingredients;
      } catch(error) {
         console.log(error)
         alert('Something went wrong :(')
      }
      console.log(this.ingredients);
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

   parseIngredients() {

      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

      const newIngredients = this.ingredients.map(el => {
         // ===== Make uniform units ======
         // Make all lowercase
         let ingredient = el.toLowerCase();

         // Replace 'long units' with 'short units'
         unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
         });

         // Remove parentheses
         ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // Regular expression found via google

         // Parse ingredients into count, unit and ingredient by
         // first splitting ingredient string into array
         const arrIng = ingredient.split(' ');

         // then find the index in the array which contains the (short) unit
         const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));


         let objIngredient;
         if (unitIndex > -1) {
            // There IS a unit

            // Ex: '4 1/2 cups', arrCount is [4, 1/2] --> eval('4+1/2') --> 4.5 
            // Ex: '4 cups', arrCount is [4]
            // Ex: ' teaspoon'
            const arrCount = arrIng.slice(0, unitIndex);
            
            let count;
            if (arrCount.length === 1) {
               count = eval(arrIng[0].replace('-', '+')); 
            } else {
               count = eval(arrIng.slice(0, unitIndex).join('+'));
            }

            objIngredient = {
               count: count,
               unit: arrIng[unitIndex],
               ingredient: arrIng.slice(unitIndex + 1).join(' ')
            }

         } else if (parseInt(arrIng[0], 10)) {
            // There is NO unit, but 1st element is a number
            objIngredient = {
               count: parseInt(arrIng[0], 10),
               unit: '',
               ingredient: arrIng.slice(1).join(' ')
            }

         } else if (unitIndex === -1) {
            // There is NO unit AND NO number in first position
            objIngredient = {
               count: 1,
               unit: '',
               ingredient: ingredient
            }
         }

         return objIngredient;
      });
      
      this.ingredients = newIngredients;
   }

   updateServings (type) {
      // Servings

      const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

      // Ingredients
      this.ingredients.forEach(ing => {
         ing.count = ing.count * (newServings / this.servings);
      });

      this.servings = newServings;
   }

};


