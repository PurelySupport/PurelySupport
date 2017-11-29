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
    newComment:[],
    updatedPost:[],
    updatedGroup: [],
    updatedEvent: [],
    updatedComment: [],
    upvotedPost:[],
    votedComment: [],
    allPosts: [],
    deletedMessage: [],
    deletedReply: [],
    deletedComment:[],
    replies: [],
    conversation: []
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
const UPDATE_POST = 'UPDATE_POST';
const UPDATE_GROUP = 'UPDATE_GROUP';
const UPDATE_EVENT = 'UPDATE_EVENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const UPVOTE_POST = 'UPVOTE_POST';
const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const DELETE_REPLY = 'DELETE_REPLY';
const DELETE_COMMENT = 'DELETE_COMMENT';
const GET_REPLIES = 'GET_REPLIES';
const GET_CONVERSATION = 'GET_CONVERSATION';
const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

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

export function createEvent(body) {
    const event = axios.post('/api/createevent', body)
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

export function updatePost() {
    const post = axios.put('/api/updatepost')
    .then(res => {
        return res.data
    })
    return {
        type: UPDATE_POST,
        payload: post
    }
}

export function updateGroup() {
    const group = axios.put('/api/updategroup')
    .then(res => {
        return res.data
    })
    return {
        type: UPDATE_GROUP,
        payload: group
    }
}

export function updateEvent() {
    const event = axios.put('/api/updateevent')
    .then( res => {
        return res.data
    })
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export function updateComment() {
    const comment = axios.put('/api/updatecomment')
    .then( res => {
        return res.data
    })
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}

export function upvotePost() {
    const vote = axios.put('/api/upvotepost')
    .then( res => {
        return res.data
    })
    return {
        type: UPVOTE_POST,
        payload: vote
    }
}

export function upvoteComment() {
    const vote = axios.put('/api/upvotecomment')
    .then( res => {
        return res.data
    })
    return {
        type:UPVOTE_COMMENT,
        payload: vote
    }
}

export function getAllPosts() {
    const posts = axios.get('/api/allposts')
    .then( res => {
        return res.data
    })
    return {
        type: GET_ALL_POSTS,
        payload: posts
    }
}

export function deleteMessage(id) {
    const remove = axios.put(`/api/deletecomment/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: DELETE_MESSAGE,
        payload: remove
    }
}

export function deleteReply(id) {
    const remove = axios.put(`/api/deletereply${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: DELETE_REPLY,
        payload: remove
    }
}

export function deleteComment(id) {
    const remove = axios.put(`/api/deletecomment/${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: DELETE_COMMENT,
        payload: remove
    }
}

export function getReplies(id) {
    const reply = axios.get(`/api/getreplies${id}`)
    .then( res => {
        return res.data
    })
    return {
        type: GET_REPLIES,
        payload: reply
    }
}

export function getConversation(activeid, friendid) {
    const convo = axios.get(`/api/getconversation/${activeid}/${friendid}`)
    .then( res => {
        return res.data
    })
    return {
        type: GET_CONVERSATION,
        payload: convo
    }
}

export function downVoteComment(id) {
const comment = axios.put('/api/downvotecomment')
.then( res => {
    return res.data
})
return {
    type: DOWNVOTE_COMMENT,
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
            
        case UPDATE_POST + '_FULFILLED':
            return Object.assign({}, state, {updatedPost: action.payload})    

        case UPDATE_GROUP + '_FULFILLED':
            return Object.assign({}, state, {updatedGroup: action.payload}) 
            
        case UPDATE_EVENT + '_FULFILLED':
            return Object.assign({}, state, {updatedEvent: action.payload})   
            
        case UPDATE_COMMENT + '_FULFILLED':
            return Object.assign({}, state, {updatedComment: action.payload})    

        case UPVOTE_POST + '_FULFILLED':
            return Object.assign({}, state, {upvotedPost: action.payload})  
            
        case UPVOTE_COMMENT + '_FULFILLED': 
            return Object.assign({}, state, {votedComment: action.payload})  
            
        case GET_ALL_POSTS  + '_FULFILLED':
            return Object.assign({}, state, {allPosts: action.payload})  
            
        case DELETE_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, {deletedMessage: action.payload})    

        case DELETE_REPLY + '_FULFILLED': 
            return Object.assign({}, state, {deletedReply: action.payload})    

        case DELETE_COMMENT + '_FULFILLED':
            return Object.assign({}, state, {deletedComment: action.payload})  
            
        case GET_REPLIES + '_FULFILLED' :
            return Object.assign({}, state, {replies: action.payload})   
            
        case GET_CONVERSATION + '_FULFILLED':
            return Object.assign({}, state, {conversation: action.payload})  
            
        case DOWNVOTE_COMMENT + '_FULFILLED':
            return Object.assign({}, state, {votedComment: action.payload})    


        default:
            return state;
    }
}
