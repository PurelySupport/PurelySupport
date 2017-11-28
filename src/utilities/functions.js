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
    }

}