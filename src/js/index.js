// Recipe API: https://www.food2fork.com/api/get
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesview';

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
         console.log(error);
      }
      console.log(state.search);
   }
};

// When search form is submitted
elements.searchForm.addEventListener('submit', e =>{
   e.preventDefault();
   controlSearch();
});

// When page buttons on search list are clicked
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
         console.log(state.recipe);
         state.recipe.parseIngredients();

         // Calculate servings and time
         state.recipe.calcTime();
         state.recipe.calcServings();

         // Render recipe
         clearLoader();
         recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
         );

      } catch (error) {
         console.log(error);
         alert('Error processing recipe.');
      }
   }
};

// Load recipe when url hash changes or page is loaded (with hash)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//================================================================================
// LIST CONTROLLER
//================================================================================
const controlList = () => {
   // Create new list IF there is none yet
   if (!state.list) state.list = new List();

   // Add each ingredient to the list
   state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
   });
}

// Handle shopping list item events
elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;

   // Handle the delete button
   if (e.target.matches('.shopping__delete, .shopping__delete *')) {
      // Delete from state
      state.list.deleteItem(id);

      // Delete from UI
      listView.deleteItem(id);

   // Handle the count button   
   } else if (e.target.matches('.shopping__count-value')) {
      const val = parseFloat(e.target.value, 10);
      // Update state
      state.list.updateCount(id, val);
   }
});

state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());


//================================================================================
// LIKES CONTROLLER
//================================================================================
const controlLike = () => {
   
   if (!state.likes) state.likes = new Likes();
   const currentID = state.recipe.id;
      
   // User has not yet liked current recipe
   if (!state.likes.isLiked(currentID)) {
      // Add like to the state
      const newLike = state.likes.addLike(
         currentID,
         state.recipe.title,
         state.recipe.author,
         state.recipe.img
      );
      // Toggle the like button
         likesView.toggleLikeBtn(true);
      // Add like to UI list
      likesView.renderLike(newLike);

   // User has liked current recipe
   } else {
      // Remove like from the state
      state.likes.deleteLike(currentID);
      // Toggle the like button
      likesView.toggleLikeBtn(false);
      // Remove like from UI list
      likesView.deleteLike(currentID);
   }

   likesView.toggleLikeMenu(state.likes.getNumLikes());

}

// Restore liked recipes on page load
window.addEventListener('load', () => {
   state.likes = new Likes();

   // Restore likes
   state.likes.readStorage();

   // Toggle like menu button
   likesView.toggleLikeMenu(state.likes.getNumLikes());

   // Render existing likes
   state.likes.likes.forEach(like => likesView.renderLike(like));
})


// Handling recipe section button events
elements.recipe.addEventListener('click', e => {
   if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease servings button is clicked
      if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         recipeView.updateServingsIngredients(state.recipe);
      }

   } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase servings button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
   } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      // Add ingredients to shopping list
      controlList();
   } else if (e.target.matches('.recipe__love, .recipe__love *')) {
      // Like controller activated
      controlLike();
   }
});






