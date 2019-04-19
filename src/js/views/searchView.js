import { elements } from '../base';
import booknlike from '../models/booknlike';
import search from '../models/search';

export const clearMovie = () => {
    elements.movieDet.innerHTML = '';
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

const renderMovie = movie => {
    let outlike,outbook;
    const user = localStorage.getItem('log');
    const bnl = new booknlike(user);
    bnl.readStorage();
    if(bnl.isLiked(movie.imdbID)){
      outlike = 'fas';
    }
    else{
      outlike = 'far';
    }
    if(bnl.isBookmarked(movie.imdbID)){
      outbook = 'fas';
    }
    else{
      outbook = 'far';
    }
    let midGen = '';
    // console.log(movie);
    movie.Genre.split(',').forEach( el => {
      midGen += `<div class="movie__tag movie__tag--${el}" style="background-color:${getRandomColor()};">#${el}</div>`
    });
    const markup = `
    <section class="movies__details" id="${movie.imdbID}">
    <figure class="movie">
      <div class="movie__hero">
        <img src="${movie.Poster}"
             alt="movie" class="movie__img">
      </div>
      <div class="movie__content">
        <div class="movie__title">
        <h1 class="movie__heading">${movie.Title}</h1>
        <a href="#" class="bookmark" ><i class="${outbook} fa-bookmark"></i></a>
        <!-- <i class="fas fa-bookmark"></i> -->
        <a href="#" class="liked" ><i class="${outlike} fa-heart"></i></a> 
        <!-- <i class="fas fa-heart"></i> -->
      </div>
        <p class="movie__description">${limitString(movie.Plot)}</p>
        <div class="tags">
          <p>tags :</p>
          <div class="tags-add">
            ${midGen}
            </div>
          </div>
        <div class="movie__details">
          <p class="movie__detail"><span class="emoji">imdb</span>${movie.imdbRating} / 10</p>
          <p class="movie__detail"><span class="emoji">⏱</span>${movie.Runtime}</p>
        </div>
      </div>
    </figure>      
    </section>
    `;
    elements.list.insertAdjacentHTML('beforeend', markup);
};

export const addYearFilter = () => {
  for(let i=1990; i <= 2019;i++){
    const markup=`
    <option value="${i}">${i}</option>
    `;
    elements.filterYear.insertAdjacentHTML('beforeend', markup);
  }
};

const clearMovies = () => {
  elements.list.innerHTML = '';
};

export const renderMovies = (movies, rating) => {
  // console.log(movies);
  clearMovies();
  const markup = `
  <h2>Movies</h2>
  `;
  elements.list.insertAdjacentHTML('beforeend', markup);
  const sea = new search('');
    movies.forEach( async (el) => {
      const movieDet = await sea.getMovieDetailsById(el.imdbID);
      // console.log(movieDet.imdbRating + ' ' + rating);
      if(movieDet.imdbRating >= rating && (rating !== 'All' || rating !== 'select')){
        renderMovie(movieDet);
      } else if(rating === 'All' || rating === 'select'){
        renderMovie(movieDet);
      }
    
  });
};

export const renderMovieSearch = movie => {
    let outlike,outbook;
    const user = localStorage.getItem('log');
    const bnl = new booknlike(user);
    bnl.readStorage();
    if(bnl.isLiked(movie.imdbID)){
      outlike = 'fas';
    }
    else{
      outlike = 'far';
    }
    if(bnl.isBookmarked(movie.imdbID)){
      outbook = 'fas';
    }
    else{
      outbook = 'far';
    }
    const markup = `
    <h2 style="margin-top: 2%;">Movie</h2>
        <div class="single__movie" id="#${movie.imdbID}">
          <h1>${movie.Title}</h1>
          <div class="poster__top">
            <div class="poster">
              <img src="${movie.Poster}" alt="${movie.Title}">
              <div class="rating">imdb <span>${movie.imdbRating} / 10</span></div>
            </div>
            <div class="poster__data">
              <p class="director">Director: <span>${movie.Director}</span></p>
              <p class="lang">Language: <span>"${movie.Language}"</span></p>
              <p class="pro">Production: <span>${movie.Production}</span></p>
              <p class="year">Year: <span>${movie.Released}</span></p>
              <p class="run">Runtime: <span>${movie.Runtime}</span></p>
              <p class="box">BoxOffice: <span>${movie.BoxOffice}</span></p>
              <p class="country">Country: <span>${movie.Country}</span></p>
              <p class="votes">imdbVotes: <span>${movie.imdbVotes}</span></p>
            </div>
            <div class="check">
              <a href="#" class="bookmark"><i class="${outbook} fa-bookmark"></i></a><br><br>
              <!-- <i class="fas fa-bookmark"></i> -->
              <a href="#" class="liked"><i class="${outlike} fa-heart"></i></a>
              <!-- <i class="fas fa-heart"></i> -->
            </div>
          </div>
          <div class="plot">
            <p>Plot: <br><span> "${movie.Plot}"</span> </p>
          </div>
          <div class="type">
            <p>Type: <span>${movie.Type}</span></p>
          </div>
          <div class="actors">
            <p>Actors: <span>${movie.Actors}</span></p>
          </div>
          <div class="writers">
            <p>Writers :<span> ${movie.Writer}</span></p>
          </div>
          <div class="genres">
            <p>Genre :<span> ${movie.Genre}</span></p>
          </div>
          <div class="awards">
            <p>Awards :<span> ${movie.Awards}</span></p>
          </div>
        </div>
    `;
    elements.movieDet.insertAdjacentHTML('afterbegin', markup);
};
