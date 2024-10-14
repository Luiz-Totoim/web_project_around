export default class Api {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL 
        this._headers = headers
    }

    getCards(){
        return fetch(`${this._baseURL}/cards`,{
            headers: this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    createCard(data){
        return fetch(`${this._baseURL}/cards`,{
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    deleteCard(cardId){
        return fetch(`${this._baseURL}/cards/${cardId}`,{
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    getUserInfo(){
        return fetch(`${this._baseURL}/users/me`,{
            headers: this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    editUserInfo(data){
        return fetch(`${this._baseURL}/users/me`,{
            method: "PATCH",
            headers: this._headers, 
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    addLike(cardId){
        return fetch(`${this._baseURL}/cards/likes/${cardId}`,{
            method: "PUT",
            headers: this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    removeLike(cardId){
        return fetch(`${this._baseURL}/cards/likes/${cardId}`,{
            method: "DELETE",
            headers: this._headers
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }

    editAvatar(image){
        return fetch(`${this._baseURL}/users/me/avatar`,{
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: image.avatar
            })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        }).catch((err) => {
            console.log(err); 
          });
    }
}
