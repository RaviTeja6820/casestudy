import { elements } from '../base';

export const renderLikes = movie => {
    const markup = `
    <li>
        <a class="dropdownlikes__link" href="#${movie.id}">
        <div class="dropdown__data">
            <h4 class="dropdown__name">${movie.title}</h4>  
            <p class="dropdown__director">${movie.director}</p>
            <p class="dropdown__boxoffice">${movie.boxoffice}</p>
        </div>
        <div class="dropdown__figure">
            <figure class="dropdown__fig">
                <img src="${movie.poster}" class="show__img" alt="Test">
            </figure>
        </div>
        </a>
    </li>
    `;
    elements.likeList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.dropdownlikes__link[href="#${id}"]`).parentElement;
    if(el) {
        el.parentElement.removeChild(el);
    } 
};

export const renderBookmarks = movie => {
    const markup = `
    <li>
        <a class="dropdownbookmarks__link" href="#${movie.id}">
        <div class="dropdown__data">
            <h4 class="dropdown__name">${movie.title}</h4>  
            <p class="dropdown__director">${movie.director}</p>
            <p class="dropdown__boxoffice">${movie.boxoffice}</p>
        </div>
        <div class="dropdown__figure">
            <figure class="dropdown__fig">
                <img src="${movie.poster}" class="show__img" alt="Test">
            </figure>
        </div>
        </a>
    </li>
    `;
    elements.bookmarkList.insertAdjacentHTML('beforeend', markup);
};

export const deleteBookmark = id => {
    const el = document.querySelector(`.dropdownbookmarks__link[href="#${id}"]`).parentElement;
    if(el) {
        el.parentElement.removeChild(el);
    } 
};