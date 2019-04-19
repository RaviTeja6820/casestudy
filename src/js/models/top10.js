import axios from 'axios';
import * as top10View from '../views/top10view'
import { renderLikes } from '../views/booknlikeView';

//http://www.omdbapi.com/?i=tt3896198&apikey=dbaf7dd7

export default class top10 {
    constructor(){
        this.topList = ['the shawshank redemption', 'the godfather', 'the dark knight', 'The Godfather: Part II', 'The Lord of the Rings: The Return of the King', 'Inception', 'The Lord of the Rings: The Fellowship of the Ring','Spider-Man: Into the Spider-Verse', 'Avengers: Infinity War',  'The Intouchables'];
        this.details = [];
    }

    async getTop10() {
        let res, movie;
        try{
                this.topList.forEach(async element => {
                    res = await axios(`http://www.omdbapi.com/?t=${element}&apikey=dbaf7dd7`);
                    // console.log(res);
                    movie = {
                        poster: res.data.Poster,
                        title: res.data.Title,
                        des: res.data.Plot,
                        genres: res.data.Genre,
                        rating: res.data.imdbRating,
                        span: res.data.Runtime,
                        id: res.data.imdbID,
                        director: res.data.Director,
                        boxoffice: res.data.BoxOffice
                    }
                    // console.log(movie);
                    this.details.push(movie);
                    if(this.details.length === 10){
                    top10View.renderTop10(this.details);
                    }
                });
        } catch(error) {
            alert(error);
        }   
    }

    getDetails(){
        return this.details;
    }
}