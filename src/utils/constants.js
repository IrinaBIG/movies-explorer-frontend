export const REGISTER_STARTING_VALUES = {
    inputValues: { name: '', email: '', password: '' },
    errValues: { name: '', email: '', password: '' },
    errStates: { name: false, email: false, password: false }
}
export const LOGIN_STARTING_VALUES = {
    inputValues: { email: '', password: '' },
    errValues: { email: '', password: '' },
    errStates: { email: false, password: false }
}
export const DURATION_TIME = 40;
export const VISIBLE_MESSAGE_TIME = 700;
export const SCREEN_WIDTH_1280 = 1280;
export const SCREEN_WIDTH_1279 = 1279;
export const SCREEN_WIDTH_768 = 768;
export const SCREEN_WIDTH_767 = 767;
export const SCREEN_WIDTH_320 = 320;
export const MOVIES_TO_LOAD_2 = 2;
export const MOVIES_TO_LOAD_4 = 4;
export const MOVIES_VISIBLE_INDEX_0 = 0;
export const MOVIES_VISIBLE_INDEX_5 = 5;
export const MOVIES_VISIBLE_INDEX_8 = 8;
export const MOVIES_VISIBLE_INDEX_16 = 16;
export const UNAUTHORIZED = 401;
export const CONFLICT_ERROR = 409;
export const INTERNAL_SERVER_ERROR = 500;
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5555' : 'https://api.diplomabig.students.nomoredomains.icu'; //htttps back
