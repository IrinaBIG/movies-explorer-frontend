class MoviesApi {
  constructor(url) {
    this._url = url;
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

  getMoviesFromApi() {
    return fetch(`${this._url}`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;