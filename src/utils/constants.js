export const registerStartingValues = {
    inputValues: { name: '', email: '', password: '' },
    errValues: { name: '', email: '', password: '' },
    errStates: { name: false, email: false, password: false }
}

export const loginStartingValues = {
    inputValues: { email: '', password: '' },
    errValues: { email: '', password: '' },
    errStates: { email: false, password: false }
}

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : 'https://api.diplomabig.students.nomoredomains.icu'; //htttps back
