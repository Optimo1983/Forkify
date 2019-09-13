// Recipe API: https://www.food2fork.com/api/get
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

import { elements, renderLoader, clearLoader } from './views/base';

/*
Global state of app
- Search object
- Current recipe object
- Shopping list object
- Linked recipes
*/
const state = {};

//================================================================================
// SEARCH CONTROLLER
//================================================================================
const controlSearch = async () => {
   // Get query from view
   const query = searchView.getInput();

   if (query) {
      // New search object and add to state
      state.search = new Search(query);

      // Prepare UI for results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);

      try {
         // Search for recipes
         await state.search.getResults();
         // Render results on UI
         clearLoader();
         searchView.renderResults(state.search.result);
      } catch (error) {
         alert('Something went wrong with the search')
      }
   }
};

elements.searchForm.addEventListener('submit', e =>{
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');

   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   };

});

//================================================================================
// RECIPE CONTROLLER
//================================================================================


const controlRecipe = async () => {
   const id = window.location.hash.replace('#', '');

   if (id) {
      // Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Highlight selected search item
      if (state.search) searchView.highlightSelected(id);

      // Create new recipe object
      state.recipe = new Recipe(id);
      try {
         // Get recipe data
         await state.recipe.getRecipe();
         state.recipe.parseIngredients();

         // Calculate servings and time
         state.recipe.calcTime();
         state.recipe.calcServings();

         // Render recipe
         clearLoader();
         recipeView.renderRecipe(state.recipe);

      } catch (error) {
         alert('Error processing recipe.');
      }
   }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
   if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button is clicked
      if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         recipeView.updateServingsIngredients(state.recipe);
      }

   } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
   }
});






