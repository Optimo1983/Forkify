import { elements } from './base';


export const toggleLikeBtn = isLiked => {
   const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
   document.querySelector('.recipe__love use').setAttribute('href', `dist/img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
   elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
   const markup = `
   <li>
      <a class="likes__link" href="#${like.id}">
         <figure class="likes__fig">
            <img src="${like.img}" alt="${like.title}">
         </figure>
         <div class="likes__data">
            <h4 class="likes__name">${like.title}</h4>
            <p class="likes__author">${like.author}</p>
         </div>
      </a>
   </li>
   `;

   elements.likesList.insertAdjacentHTML('beforeend', markup);
}; 

export const deleteLike = id => {
   const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;

   if (el) el.parentElement.removeChild(el);
}

export const toggleLikesMenu = e => {
   if (elements.likesPanel.classList.contains('open')) {
      console.log('Closing the likes');
      elements.likesPanel.classList.remove('open');

      elements.likesPanel.style.opacity = "0";
      elements.likesPanel.style.visibility = "hidden";
   } else {
      console.log('Opening the likes');
      elements.likesPanel.classList.add('open');

      elements.likesPanel.style.visibility = "visible";
      elements.likesPanel.style.opacity = "1";

   }
}