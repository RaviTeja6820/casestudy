import { elements } from './base';
import top10 from './models/top10';
import signinnup from './models/signinnup';
import booknlike from './models/booknlike';
import search from './models/search';
import * as top10View from './views/top10view';
import { signupView } from './views/signupView';
import * as booknlikeView from './views/booknlikeView';
import * as searchView from './views/searchView';

const state = [];
localStorage.setItem('login', false);
console.log(state);
const controlTop = async () => {
    //create top 10 list
    state.top = new top10();
    //retrive data from server
    top10View.clearResults();
    try {
        await state.top.getTop10();
    } catch(error) {
        alert(error);
    }
};

elements.top10form.addEventListener('click', e => {
    e.preventDefault();
    controlTop();
    elements.top10dis.scrollIntoView();
});


elements.top10dis.addEventListener('click', e => {
    if(e.target.matches('#top10Close')) {
        e.preventDefault();
        // const res = state.top.getDetails();
        // console.log(res);
        // console.log(res.length);
        top10View.clearResults();
    }
});

window.addEventListener('load', () => {
    state.signinnup = new signinnup();
    state.signinnup.readStorage();
});

let login = false;

if(elements.header)
elements.header.addEventListener('click', el => {
    if(el.target.matches('#info')){
        if(!document.getElementById('form-rpa'))
        signupView();
    }
    else if(el.target.matches('.signin') || el.target.closest('.signin p')){
        el.preventDefault();
        if(!document.getElementById('form-rpa')){
            const name = elements.username.value;
            const pass = elements.psswd.value;
            const user = {
                username: name,
                password: pass
            }
            if(name.length === 0 || pass.length === 0 ){
                alert(` * fields are empty `);
            }
            else{
                state.signinnup.signinCheck(user);
            }
        }
    }
    else if(el.target.matches('.signup') || el.target.closest('.signup p')){
        el.preventDefault();
        if(!document.getElementById('form-rpa')){
            alert(`click '@new user' or 'SignUp button' at top right corner to create an account`);
        }
        else{
            const name = elements.username.value;
            const pass = elements.psswd.value;
            const repass = document.getElementById('form-rpa').value;
            if(name.length === 0 || pass.length === 0 || repass.length === 0){
                alert(` * fields are empty `);
            }
            else if(state.signinnup.passCheck(pass)) {
                if(pass !== repass) alert(`wrong entry in renter password`);
                else {
                    if(!state.signinnup.signup(name,pass)) alert(`User already exists`);
                }
            }else alert(`password doesn't follow required credentials`);;
        }
    }
});


if(elements.signout)
elements.signout.addEventListener('click', el => {
    el.preventDefault();
    window.location = "/";
    let url = window.location.href;
    const rep = (url.substr(21,url.length));
    url = url.replace(rep, "");
    localStorage.setItem('login', false);
    localStorage.setItem('log', '');
    window.location.href = url;
});

const controlLikes = async(el) => {
        const movie = await state.signedin.getData(el);
        // console.log(movie);
        booknlikeView.renderLikes(movie);
};

const controlBookmarks = async(el) => {
        const movie = await state.signedin.getData(el);
        // console.log(movie);
        booknlikeView.renderBookmarks(movie);
};

if(!elements.header) {
    // let url = window.location.href;
    // const username = (url.substr(36,url.length));
    const username = localStorage.getItem('log');
    state.signedin = new booknlike(username);
    state.signedin.readStorage();
    localStorage.setItem('login', true);
    const likes = state.signedin.getLikes();
    likes.forEach( async(el) => {
        await controlLikes(el);
    });
    const bookmarks = state.signedin.getBookmarks();
    bookmarks.forEach( async(el) => {
        await controlBookmarks(el);
    });
    searchView.addYearFilter();
};

if(elements.navbar)
elements.navbar.addEventListener('click', () => {
    if(!document.getElementById('form-rpa')){
        signupView();
    }
});


if(elements.list)
    elements.list.addEventListener('click', e => {
        e.preventDefault(); 
        // console.log(localStorage.getItem('login'));
        // console.log(e.target);
            if(e.target.matches('.far') && e.target.matches('.fa-heart')){
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //addlike
                state.signedin.addLike(movieId);
                controlLikes(movieId);
            }
            else if(e.target.matches('.far') && e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 2);
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //add bookmark
                state.signedin.addBookmark(movieId);
                controlBookmarks(movieId);
            } 
            else if(e.target.matches('.fas') && e.target.matches('.fa-heart')){
                // console.log(e.target + ' ' + 3);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //remove like
                state.signedin.deleteLike(movieId);
                booknlikeView.deleteLike(movieId);
            }
            else if(e.target.matches('.fas') &&  e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 4);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //remove bookmark
                state.signedin.deleteBookmark(movieId);
                booknlikeView.deleteBookmark(movieId);
            }
            else if(e.target.matches('.movie__img')){
                const find = async () => {
                const movieID  = e.target.parentNode.parentNode.parentNode.id;
                state.search = new search('');
                const movieDetails = await state.search.getMovieDetailsById(movieID);
                searchView.clearMovie();
                searchView.renderMovieSearch(movieDetails);
                elements.movieDet.scrollIntoView();
                };
                find();
            }
        });

        if(elements.list)
    elements.top10dis.addEventListener('click', e => {
        e.preventDefault(); 
        // console.log(localStorage.getItem('login'));
        // console.log(e.target);
            if(e.target.matches('.far') && e.target.matches('.fa-heart')){
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //addlike
                state.signedin.addLike(movieId);
                controlLikes(movieId);
            }
            else if(e.target.matches('.far') && e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 2);
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //add bookmark
                state.signedin.addBookmark(movieId);
                controlBookmarks(movieId);
            } 
            else if(e.target.matches('.fas') && e.target.matches('.fa-heart')){
                // console.log(e.target + ' ' + 3);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //remove like
                state.signedin.deleteLike(movieId);
                booknlikeView.deleteLike(movieId);
            }
            else if(e.target.matches('.fas') &&  e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 4);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                const movieId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                //remove bookmark
                state.signedin.deleteBookmark(movieId);
                booknlikeView.deleteBookmark(movieId);
            }
            else if(e.target.matches('.movie__img')){
                const find = async () => {
                const movieID  = e.target.parentNode.parentNode.parentNode.id;
                state.search = new search('');
                const movieDetails = await state.search.getMovieDetailsById(movieID);
                searchView.clearMovie();
                searchView.renderMovieSearch(movieDetails);
                elements.movieDet.scrollIntoView();
                };
                find();
            }
        });



        if(elements.searchbar){
            elements.searchbtn.addEventListener('click', async () => {
                const movie = await elements.searchbar.value;
                const ratings = await elements.filterRating.value;
                const year = await elements.filterYear.value;
                // const type = await elements.filterType.value;
                state.search = new search(movie);
                const movieSearch = await state.search.getMovieDetailsByFilters(year);
                // console.log(movieSearch.Response);
                if(movieSearch.Response === "False" ){
                    const markup = `<h1 style="font-size: 70%;text-align: center; margin-top: 3%; background: #aaa; color: black;">No Such Movie Found</h1>`;
                    elements.movieDet.insertAdjacentHTML('afterbegin', markup);
                } else {
                    searchView.renderMovies(movieSearch, ratings);
                    elements.list.scrollIntoView();
                 }
                // console.log(movieDetails);
            });
            document.addEventListener('keypress', e => {
                    if(e.keyCode === 13 || e.keyCode === 13){
                        const get = async () => {
                            const movie = await elements.searchbar.value;
                            const ratings = await elements.filterRating.value;
                            const year = await elements.filterYear.value;
                            // const type = await elements.filterType.value;
                    state.search = new search(movie);
                    const movieSearch = await state.search.getMovieDetailsByFilters(year);
                    // console.log(movieSearch.Response);
                    if(movieSearch.Response === "False"){
                        const markup = `<h1 style="font-size: 70%;text-align: center; margin-top: 3%; background: #aaa; color: black;">No Such Movie Found</h1>`;
                        elements.movieDet.insertAdjacentHTML('afterbegin', markup);
                    } else {
                        searchView.renderMovies(movieSearch, ratings);
                        elements.list.scrollIntoView();
                    } 
                    };
                    get();
                }
            });
        }


        if(elements.movieDet)
        elements.movieDet.addEventListener('click', e => {
            e.preventDefault();
            if(e.target.matches('.far') && e.target.matches('.fa-heart')){
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                let movieId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                movieId = movieId.replace('#','');
                // console.log(movieId);
                state.signedin.addLike(movieId);
                controlLikes(movieId);
            }
            else if(e.target.matches('.far') && e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 2);
                let str = e.target.className;
                str = str.replace('far', 'fas');
                e.target.className = str;
                let movieId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                movieId = movieId.replace('#','');
                //add bookmark
                state.signedin.addBookmark(movieId);
                controlBookmarks(movieId);
            } 
            else if(e.target.matches('.fas') && e.target.matches('.fa-heart')){
                // console.log(e.target + ' ' + 3);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                let movieId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                movieId = movieId.replace('#','');
                //remove like
                state.signedin.deleteLike(movieId);
                booknlikeView.deleteLike(movieId);
            }
            else if(e.target.matches('.fas') &&  e.target.matches('.fa-bookmark')){
                // console.log(e.target + ' ' + 4);
                let str = e.target.className;
                str = str.replace('fas', 'far');
                e.target.className = str;
                let movieId = e.target.parentNode.parentNode.parentNode.parentNode.id;
                movieId = movieId.replace('#','');
                //remove bookmark
                state.signedin.deleteBookmark(movieId);
                booknlikeView.deleteBookmark(movieId);
            }
        });

        if(elements.likeList)
        elements.likeList.addEventListener('click', async (e) => {
            const address = e.target.parentNode.parentNode.href;
            const startInd = address.indexOf("#");
            const movieId = address.slice(startInd+1, address.length);
            // console.log(movieId);
                state.search = new search('');
                const movieDetails = await state.search.getMovieDetailsById(movieId);
                searchView.clearMovie();
                searchView.renderMovieSearch(movieDetails);
                elements.movieDet.scrollIntoView();
        });

        if(elements.bookmarkList)
        elements.bookmarkList.addEventListener('click', async (e) => {
            const address = e.target.parentNode.parentNode.href;
            const startInd = address.indexOf("#");
            const movieId = address.slice(startInd+1, address.length);
            // console.log(movieId);
                state.search = new search('');
                const movieDetails = await state.search.getMovieDetailsById(movieId);
                searchView.clearMovie();
                searchView.renderMovieSearch(movieDetails);
                elements.movieDet.scrollIntoView();
        });
