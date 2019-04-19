import { elements } from '../base';
import booknlike from '../models/booknlike';

export const clearResults = () => {
  elements.top10dis.innerHTML = '';
  i=0;
};

export const limitString = (title, limit = 115) => {
  const newTitle = [];
  if(title.length > limit) {
      title = title.split(' ').reduce((acc, curr) => {
          if(acc + curr.length <= limit) {
              newTitle.push(curr);
          }
          return acc + curr.length;
      }, 0);
      return `${newTitle.join(' ')} ...`;
  }
  return title;
};


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let i=0;

const renderMovie = movie => {
  let sty='';
  if(localStorage.getItem('login') === 'false'){
    sty = `style="display:none";`;
  }
    let outlike,outbook;
    const user = localStorage.getItem('log');
    const bnl = new booknlike(user);
    bnl.readStorage();
    if(bnl.isLiked(movie.id)){
      outlike = 'fas';
    }
    else{
      outlike = 'far';
    }
    if(bnl.isBookmarked(movie.id)){
      outbook = 'fas';
    }
    else{
      outbook = 'far';
    }
    let midGen = '';
    movie.genres.split(',').forEach( el => {
      midGen += `<div class="movie__tag movie__tag--${el}" style="background-color:${getRandomColor()};">#${el}</div>`
    });
    const start = '<h2>Top10 movies right now  <a href="#"><i class="far fa-times-circle" id="top10Close" style="color: #b10000;"></i></a></h2>';
    if(i === 0) { elements.top10dis.insertAdjacentHTML('afterbegin', start); i+=1; };
    const markup = `
    <section class="movies__details" id="${movie.id}">
    <figure class="movie">
      <div class="movie__hero">
        <img src="${movie.poster}"
             alt="movie" class="movie__img">
      </div>
      <div class="movie__content">
        <div class="movie__title">
        <h1 class="movie__heading">${movie.title}</h1>
        <a href="#" class="bookmark" ${sty}><i class="${outbook} fa-bookmark"></i></a>
        <!-- <i class="fas fa-bookmark"></i> -->
        <a href="#" class="liked" ${sty}><i class="${outlike} fa-heart"></i></a> 
        <!-- <i class="fas fa-heart"></i> -->
      </div>
        <p class="movie__description">${limitString(movie.des)}</p>
        <div class="tags">
          <p>tags :</p>
          <div class="tags-add">
            ${midGen}
            </div>
          </div>
        <div class="movie__details">
          <p class="movie__detail"><span class="emoji">imdb</span>${movie.rating} / 10</p>
          <p class="movie__detail"><span class="emoji">⏱</span>${movie.span}</p>
        </div>
      </div>
    </figure>      
    </section>
    `;
    elements.top10dis.insertAdjacentHTML('beforeend', markup);
};

export const renderTop10 = top10s => {
    top10s.forEach(renderMovie);
};