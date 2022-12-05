class MainApi {
    constructor(url, token) {
      this._url = url;
      this._token = token;
      this._headers = {
        'Content-Type': 'application/json'
      }
    }
  
    _checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Возникла ошибка: ${res.status}`);
    }
  
    // getSavedMovies() {
    //   return fetch(`${this._url}/movies`, {
    //     headers: this._headers
    //     // 'authorization': this._token,
    //   })
    //   .then(this._checkResponse)
    // }
  
    getUser() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }
  
    editUserInfo(data) {
      // console.log(data); 
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify(data)
      })
      .then(this._checkResponse)
    }
  
    addMovie(data) {
      
      return fetch(`${this._url}/movies`, {
        headers: this._headers,
        credenyials: 'include',
        method: 'POST',
        body: JSON.stringify({
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: (`https://api.nomoreparties.co/${data.image.url}`),
          trailerLink: data.trailerLink,
          thumbnail: (`https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`),
          movieId: data.movieId,
          nameRU: data.nameRU,
          nameEN: data.nameEN
        })
      })
      .then(this._checkResponse)
    }
  
    deleteMovie(movieId) {
      return fetch(`${this._url}/movies/${movieId}`, {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(this._checkResponse)
    }
  
    toggleLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: isLiked ? 'DELETE' : 'PUT',
      })
        .then(this._checkResponse)
    }
  
    // updateAvatar(avatarPlace) {
    //   const body = {
    //     avatar: avatarPlace
    //   };
    //   return fetch(`${this._url}/users/me/avatar`, {
    //     headers: this._headers,
    //     method: 'PATCH',
    //     body: JSON.stringify(body)
    //   })
    //     .then(this._checkResponse)
    // }
  }
  
  const api = new MainApi('https://api.diplomabig.students.nomoredomains.icu');
  
  export default api;