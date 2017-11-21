import axios from 'axios';

const initialState = {
    userCredentials: {},
    userDetails: {},
    diseases: [],
    interests: [],
    groups: [],
    userMessages: [],
    selectedPost:[],
    comments:[],
    newPost: [],
    newGroup: [],
    newEvent: [],
    newMessage: [],
    newReply: [],
    newComment:[]
}

const GET_USER_CREDENTIALS = 'GET_USER_CREDENTIALS';
const GET_USER_DETAILS = 'GET_USER_DETAILS';
const GET_DISEASES = "GET_DISEASES";
const GET_INTERESTS = "GET_INTERESTS";
const GET_GROUPS = "GET_GROUPS";
const GET_USER_MESSAGES = "GET_USER_MESSAGES";
const GET_POST = 'GET_POST';
const GET_USER_COMMENTS = 'GET_USER_COMMENTS';
const CREATE_POST = 'CREATE_POST';
const CREATE_GROUP = 'CREATE_GROUP';
const CREATE_EVENT = 'CREATE_EVENT';
const CREATE_MESSAGE = 'CREATE_MESSAGE';
const CREATE_REPLY = 'CREATE_REPLY';
const CREATE_COMMENT = 'CREATE_COMMENT'; 

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
    const messages = axios.get(`/api/messages/${id}`)
        .then(res => {
            return res.data
        })
        return {
            type: GET_USER_MESSAGES,
            payload: messages
        }
}

export function getPost(id) {
    const post = axios.get(`/api/getpost/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: GET_POST,
        payload: post
    }
}

export function getUserComments(id) {
    const comments = axios.get(`/api/getcomments/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: GET_USER_COMMENTS,
        payload: comments
    }
}

export function createPost() {
    const post = axios.post('/api/createpost')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function createGroup() {
    const group = axios.post('/api/creategroup')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_GROUP,
        payload:group
    }
}

export function createEvent() {
    const event = axios.post('/api/createevent')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

export function createMessage() {
    const message = axios.post('/api/createmessage')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_MESSAGE,
        payload: message
    }
}

export function createReply() {
    const reply = axios.post('/api/createreply')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_REPLY,
        payload: reply
    }
}

export function createComment() {
    const comment = axios.post('/api/postcomment')
    .then( res => {
        return res.data
    })
    return {
        type: CREATE_COMMENT,
        payload: comment
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
            return Object.assign({}, state, { userMessages: action.payload })

        case GET_POST + "_FULFILLED":
            return Object.assign({}, state, {selectedPost: action.payload})    

        case GET_USER_COMMENTS + "FULFILLED":
            return Object.assign({}, state, {comments: action.payload})    

        case CREATE_POST + 'FULFILLED':
            return Object.assign({}, state, {newPost: action.payload})    

        case CREATE_GROUP + 'FULFILLED':
            return Object.assign({}, state, {newGroup: action.payload})    

        case CREATE_EVENT + 'FULFILLED':
            return Object.assign({}, state, {newEvent: action.payload})    

        case CREATE_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, {newMessage: action.payload})    

        case CREATE_REPLY + '_FULFILLED':
            return Object.assign({}, state, {newReply: action.payload})    

        case CREATE_COMMENT + '_FULFILLED':
            return Object.assign({}, state, {newComment: action.payload})    


        default:
            return state;
    }
}
