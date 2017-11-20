import axios from 'axios';

const initialState = {
    userCredentials: {},
    userDetails: {},
    diseases: [],
    interests: [],
    groups: [],
    userMessages: []
}

const GET_USER_CREDENTIALS = 'GET_USER_CREDENTIALS';
const GET_USER_DETAILS = 'GET_USER_DETAILS';
const GET_DISEASES = "GET_DISEASES";
const GET_INTERESTS = "GET_INTERESTS";
const GET_GROUPS = "GET_GROUPS";
const GET_USER_MESSAGES = "GET_USER_MESSAGES";

export function getUserCredentials() {
    const userData = axios.get('/auth/me')
        .then(res => {
            return res.data
        })
    return {
        type: GET_USER_CREDENTIALS,
        payload: userData
    }
}

export function getUserDetails(id) {
    const userData = axios.get(`/api/getuserinfo/${id}`)
        .then(res => {
            return res.data
        })
    return {
        type: GET_USER_DETAILS,
        payload: userData
    }
}

export function getDiseases() {
    const newData = axios.get('/api/getdiseases')
        .then(res => {
            return res.data
        })
    return {
        type: GET_DISEASES,
        payload: newData
    }
}

export function getInterests() {
    const newData = axios.get('/api/getinterests')
        .then(res => {
            return res.data
        })
    return {
        type: GET_INTERESTS,
        payload: newData
    }
}

export function getGroups() {
    const newData = axios.get('/api/getgroups')
        .then(res => {
            return res.data
        })
    return {
        type: GET_GROUPS,
        payload: newData
    }
}

export function getUserMessages(id) {
    const messages = axios.get(`/api/getmessages/${id}`)
        .then(res => {
            return res.data
        })
        return {
            type: GET_USER_MESSAGES,
            payload: messages
        }
}

export default function reducer(state = initialState, action) {
    console.log('action fired!! ', action)
    switch (action.type) {
        case GET_USER_CREDENTIALS + '_FULFILLED':
            return Object.assign({}, state, { userCredentials: action.payload })

        case GET_USER_DETAILS + "_FULFULLED":
            return Object.assign({}, state, { userDetails: action.payload })

        case GET_DISEASES + "_FULFILLED":
            return Object.assign({}, state, { diseases: action.payload })

        case GET_INTERESTS + "_FULFILLED":
            return Object.assign({}, state, { interests: action.payload })

        case GET_GROUPS + "_FULFILLED":
            return Object.assign({}, state, { groups: action.payload })

        case GET_USER_MESSAGES + "_FULFILLED":
            return Object.assign({}, state, { messages: action.payload })


        default:
            return state;
    }
}
