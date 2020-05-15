import { elements } from './base';


export const toggleLikeBtn = isLiked => {
   const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
   document.querySelector('.recipe__love use').setAttribute('href', `dist/img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
   if (window.innerWidth > 600){
      elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';

   } else {
      elements.likesMenu.style.display = numLikes > 0 ? 'flex' : 'none';

   }
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

export const toggleLikesPanel = e => {
   console.log(e.target)
   if (e.target.matches('.likes__link, .likes__link *') || e.target.matches('.likes__field, .likes__field *')) {
      if (elements.likesPanel.classList.contains('open')) {
         closeLikesPanel();
      } else {
         openLikesPanel();
      }
   }
}

const openLikesPanel = () => {
   elements.likesPanel.classList.add('open');
   elements.likesPanel.style.visibility = "visible";
   elements.likesPanel.style.opacity = "1";
}

const closeLikesPanel = () => {
   elements.likesPanel.classList.remove('open');
   elements.likesPanel.style.opacity = "0";
   elements.likesPanel.style.visibility = "hidden";
}