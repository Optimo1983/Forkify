import { elements } from './base';

export const renderItem = item => {
   const markup = `
      <li class="shopping__item" data-itemid=${item.id}>
         <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" min="0" class="shopping__count-value">
            <p>${item.unit}</p>
         </div>
         <p class="shopping__description">${item.ingredient}</p>
         <button class="shopping__delete btn-tiny">
            <svg>
               <use href="dist/img/icons.svg#icon-circle-with-cross"></use>
            </svg>
         </button>
      </li>
   `;

   elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
   const item = document.querySelector(`[data-itemid="${id}"]`);

   if (item) {
      item.style.transform = 'scale(0)';


      setTimeout(() => {
         item.parentElement.removeChild(item);
      }, 300)
   } 
};