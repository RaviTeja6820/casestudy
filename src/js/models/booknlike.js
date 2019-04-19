import axios from 'axios';
import booknlikeView from '../views/booknlikeView';

export default class booknlike {
    constructor(username) {
        this.userDetails = [];
        this.username = username;
        this.likes = [];
        this.bookmarks = [];
    }

    addLike(id){
        if(this.likes.indexOf(id) === -1)
        this.likes.push(id);
        this.persistData();
    }

    addBookmark(id){
        if(this.bookmarks.indexOf(id) === -1)
        this.bookmarks.push(id);
        this.persistData();
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el === id);
        this.likes.splice(index, 1);
        this.persistData();
    }

    deleteBookmark(id){
        const index = this.likes.findIndex(el => el === id);
        this.bookmarks.splice(index, 1);
       this.persistData();
    }

    isLiked(id){
        if(this.likes.findIndex(el => (el === id)) >= 0){
            return true;
        }
        else return false;
    }

    isBookmarked(id){
        if(this.bookmarks.findIndex(el => el === id) >= 0){
            return true;
        }
        else return false;
    }

    getUserName(){
        return this.username;
    }

    getLikes(){
        return this.likes;
    }

    getBookmarks(){
        return this.bookmarks;
    }
    
    addUserDetail(){
        const userDetail = {
            username: this.username,
            likes: this.likes,
            bookmarks: this.bookmarks
        };

        if(this.userDetails.findIndex( el => (el.username === userDetail.username)) === -1){
            this.userDetails.push(userDetail);
        }
    }

    async getData(movieID) {
        try{
                const res = await axios(`http://www.omdbapi.com/?i=${movieID}&apikey=dbaf7dd7`);
                // console.log(res);
                const movie = {
                    poster: res.data.Poster,
                    title: res.data.Title,
                    id: res.data.imdbID,
                    director: res.data.Director,
                    boxoffice: res.data.BoxOffice
                }
                return movie;
        } catch(error) {
            alert(error);
        }
    }
    
    persistData() {
        this.addUserDetail();
        localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('userDetails'));
        //Restoring likes from storage
        if(storage) {
            this.userDetails = storage;
            this.userDetails.forEach( el => {
                if(this.username === el.username){
                    this.username = el.username;
                    this.likes = el.likes,
                    this.bookmarks = el.bookmarks
                }
            });
        }
    }
};