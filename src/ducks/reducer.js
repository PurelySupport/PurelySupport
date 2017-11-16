import axios from 'axios';

const initialState = {
    userCredentials: {},
    userDetails: {},
}

const GET_USER_CREDENTIALS = 'GET_USER_CREDENTIALS';
const GET_USER_DETAILS = 'GET_USER_DETAILS';

export function getUserCredentials(){
    const userData = axios.get('/auth/me')
    .then(res => {
        console.log(res)
        return res.data
    })
    return {
        type: GET_USER_CREDENTIALS,
        payload: userData
    }
}

export function getUserDetails(){
    const userData = axios.get('/api/getuserinfo')
    .then(res => {
        return res.data
    })
    return {
        type: GET_USER_DETAILS,
        payload: userData
    }
}

export default function reducer(state = initialState, action){
    console.log('action fired!! ', action)
    switch(action.type){
        case GET_USER_CREDENTIALS + '_FULFILLED':
        return Object.assign({}, state, {userCredentials: action.payload})
        default:
        return state;
    }
}
