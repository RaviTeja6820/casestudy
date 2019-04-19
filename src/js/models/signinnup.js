import { elements } from '../base';
import state from '../index';
import booknlike from './booknlike';

export default class signinnup {
    constructor() {
        this.users = [];
    }
    passCheck(pass) {
        if(pass.includes('@')) return true;
        else return false;
    }
    signup(un, pa){
        const user = {
            username: un,
            password: pa
        };
        if(this.hasUserName(user)) return false;
        else {
            this.addUser(user);
            this.persistUsers();
            alert('you successfully created an account in MovieTracker, happy to see you signup');
            return true;
        }
    }
    signinCheck(user){
        // console.log(this.unAndPswdCheck(user));
        if(this.unAndPswdCheck(user)){
            //todo
            console.log(user.username);
            alert('Succesfully Logged in');
            let url = window.location.href;
            console.log(url);
            url = url.substr(0,21);
            console.log(url);
            localStorage.setItem('log',user.username);
            window.location.href = (url + "/signedin.html#" + user.username);
        } else if(this.hasUserName(user) && !this.unAndPswdCheck(user)){
            alert('Invalid login credentials')
        }   
    }
    addUser(user) {
        this.users.push(user);
    }

    hasUserName(user){
        let userThere = false;
        this.users.forEach( el => {
            userThere = (el.username === user.username);
        });
        return userThere;
    }

    unAndPswdCheck(user){
        let userThere = false;
        this.users.forEach( el => {
            if (el.username === user.username && el.password === user.password) {
                userThere = true;
            }
        });
        return userThere;
    }

    persistUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('users'));  
        if(storage) this.users = storage;
    }
}