import axios from 'axios'
const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(id, username, profile_pic) {
    console.log("login hit: ", LOGIN_USER)
    return {
        type: LOGIN_USER,
        payload: { id, username, profile_pic }
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}


export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true }
        case LOGOUT_USER:
            return {...state, ...action.payload }

        default:
            return initialState
    }
}