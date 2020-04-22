const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const UPDATE_USER = 'UPDATE_USER'

export function loginUser(username, profile_pic) {
    console.log("login hit: ", LOGIN_USER)
    return {
        type: LOGIN_USER,
        payload: { username, profile_pic }
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function updateUser(userObj) {
    // const userPromise = axios.get('/auth/me')
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true }
        case LOGOUT_USER:
            return {...state, ...action.payload }
        case UPDATE_USER:
            return {...state, user: action.payload, isLoggedIn: true }
        default:
            return initialState
    }
}