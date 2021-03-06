const axios = require('axios');

module.exports = {
    getPosts: (url) =>  {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getComments: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    grabPost: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data[0]
        })
    },
    getConversation: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getEvents: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getMessage: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getUserInfo: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getDiseases: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getInterests: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },
    getGroups: (url) => {
        return axios.get(url)
        .then( res => {
            return res.data
        })
    },

}