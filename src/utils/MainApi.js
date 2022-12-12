class MainApi {
    constructor(url, token) {
      this._url = url;
      this._token = token;
      this._headers = {
        'Content-Type': 'application/json',
        Accept: "application/json",
      }
    }
  
    _getToken(){
      return localStorage.getItem('token');
    }
  
    _enterBearerToken(headers) {
      if (!this._getToken()) {
        return headers;
      }
      return {
        ...headers, Authorization: `Bearer ${this._getToken()}`,
      }
    }

    _checkResponse = (res) => {
      if (res.ok) {
        // console.dir(res)
        return res.json();
      }
      return res.json()
      .then((err) => {
        err.statusCode=res.status;
        return Promise.reject(err);
      })
    }
  
    getUser() {
      return fetch(`${this._url}/users/me`, {
        headers: this._enterBearerToken(this._headers),
      })
      .then(this._checkResponse)
    }
  
    editUserInfo(data) {
      // console.log(data); 
      return fetch(`${this._url}/users/me`, {
        headers: this._enterBearerToken(this._headers),
        method: 'PATCH',
        body: JSON.stringify(data)
      })
      .then(this._checkResponse)
    }

    getMovies() {
      return fetch(`${this._url}/movies`, {
        headers: this._enterBearerToken(this._headers),
      })
      .then(this._checkResponse)
    }

    addMovie(movie) {
      return fetch(`${this._url}/movies`, {
          headers: this._enterBearerToken(this._headers),
          method: 'POST',
          body: JSON.stringify( {
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: (`https://api.nomoreparties.co/${movie.image.url}`),
          // image: movie.image,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: (`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`),
          // thumbnail: movie.thumbnail,
          movieId: movie.id
        } )
      })
      .then(this._checkResponse)
    }
  
    deleteMovie(movieId) {
      return fetch(`${this._url}/movies/${movieId}`, {
        headers: this._enterBearerToken(this._headers),
        method: 'DELETE',
      })
      .then(this._checkResponse)
    }
  
    // toggleLike(cardId, isLiked) {
    //   return fetch(`${this._url}/cards/${cardId}/likes`, {
    //     headers: this._headers,
    //     method: isLiked ? 'DELETE' : 'PUT',
    //   })
    //     .then(this._checkResponse)
    // }
  
  }
  
  const api = new MainApi('https://api.diplomabig.students.nomoredomains.icu');
  
  export default api;