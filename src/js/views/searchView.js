import { elements } from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
   elements.searchInput.value = '';
};

export const clearResults = () => {
   elements.searchResList.innerHTML = '';
   elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
   const resultsArr = Array.from(document.querySelectorAll('.results__link'));

   let IDs = [];

   resultsArr.forEach(el => {
      el.classList.remove('results__link--active');
      const elementID = el.href.split('#', 2)[1];
      IDs.push(elementID);
   });


   if (IDs.includes(id)) {
      document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
   }
};


const renderRecipe = recipe => {
   const markup = 
      `<li>
         <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
               <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
               <h4 class="results__name">${recipe.title}</h4>
               <p class="results__author">${recipe.publisher}</p>
            </div>
         </a>
      </li>`;

      elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) =>  `
   <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
         <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
         <svg class="search__icon">
            <use href="dist/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
         </svg>
   </button>
`;



const renderButtons = (page, numResults, resPerPage) => {
   const pages = Math.ceil(numResults / resPerPage);

   let button;
   if (page === 1 && pages > 1) {
      // Only next button
      button = createButton(page, 'next');

   } else if (page < pages) {
      // Both buttons
      button = `
         ${createButton(page, 'prev')}
         ${createButton(page, 'next')}
      `;
      
   } else if (page === pages && pages > 1) {
      // Only previous button
      button = createButton(page, 'prev')
   }

   elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (recipes, page = 1, resPerPage = 10) => {
   // Render results of current page
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;
   
   recipes.slice(start, end).forEach(renderRecipe);

   // Render page buttons
   renderButtons(page, recipes.length, resPerPage);
};

export const showPopUp = (errorMsg) => {
   elements.popUpBox.style.display = 'block';
}

export const closePopUp = () => {
   elements.popUpBox.style.display = 'none';

}