// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.diplomabig.students.nomoredomains.icu';

const checkResponse = (res) => {
    if (res) {
        console.dir(res)
        return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        // credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => checkResponse(res));
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,            
        }
    })
        .then((res) => checkResponse(res));
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => checkResponse(res))
};
