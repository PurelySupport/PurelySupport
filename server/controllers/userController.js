module.exports = {
    register: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.register_user([body.userid, body.displayname, body.firstname, body.lastname, body.state, body.city])
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    getDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.get_diseases()
        .then(res => {
            res.status(200).send(res.data)
        })
    },
    getInterests: (req, res, next) => {
        const db = req.app.get('db')
        db.get_interests()
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    getGroups: (req, res, next) => {
        const db = req.app.get('db')
        db.get_groups()
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    updateGroups: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_groups([body.userid, body.groupid])
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    updateInterests: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_interests([body.userid, body.interestid])
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    updateDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_diseases([body.userid, body.diseaseid])
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    getUserInfo: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user_info(req.params.id)
        .then( res => {
            res.status(200).send(res.data)
        })
    },
    getUserCredentials: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user_credentials(req.params.id)
        .then( res => {
            res.status(200).send(res.data)
        })
    }
}