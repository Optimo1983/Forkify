// Variables and functions used by multiple view modules

export const elements = {
   searchForm: document.querySelector('.search'),
   searchInput: document.querySelector('.search__field'),
   searchRes: document.querySelector('.results'),
   searchResPages: document.querySelector('.results__pages'),
   searchResList: document.querySelector('.results__list'),
   recipe: document.querySelector('.recipe'),
   shopping: document.querySelector('.shopping__list'),
   likesMenu: document.querySelector('.likes__field'),
   likesPanel: document.querySelector('.likes__panel'),
   likesList: document.querySelector('.likes__list'),
   popUpBox: document.querySelector('.pop-up__box'),
   popUpCloseBtn: document.querySelector('.pop-up__close-btn'),
   popUpMsg: document.querySelector('.pop-up__msg')
};

export const elementStrings = {
   loader: 'loader'
};


export const renderLoader = parent => {
   const loader = `
      <div class="${elementStrings.loader}">
         <svg>
            <use href="img/icons.svg#icon-cw"></use>
         </svg>
      </div>
   `;

   parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
   const loader = document.querySelector(`.${elementStrings.loader}`);
   
   if (loader) {
      loader.parentElement.removeChild(loader);
   };
};

export const showPageSection = (node) => {
   node.classList.remove('remove');
};


