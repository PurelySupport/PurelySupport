module.exports = {
    register: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.register_user([body.userid, body.displayname, body.firstname, body.lastname, body.state, body.city])
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    getUserCredentials: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user_credentials(req.params.id)
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    getUserInfo: (req, res, next) => {
        const db = req.app.get('db')
        const { params } = req;

        db.get_user_info([params.id])
            .then(data => {
                res.status(200).send(data)
                console.log('ctrl', data)
            }).catch(() => res.status(500).send());
    },
    updateGroups: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_groups([body.userid, body.groupid])
            .then(data => {
                res.status(200).send("Groups Updated")
            }).catch(() => res.status(500).send());
    },

    updateInterests: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_interests([body.userid, body.interestid])
            .then(data => {
                res.status(200).send("Interesting... this was successful")
            }).catch(() => res.status(500).send());
    },
    updateDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_diseases([body.userid, body.diseaseid])
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    getDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.get_diseases()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    getInterests: (req, res, next) => {
        const db = req.app.get('db')
        db.get_interests()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    getGroups: (req, res, next) => {
        const db = req.app.get('db')
        db.get_groups()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send());
    },
    createPost: (req, res, next) => {
        const db = req.app.get('db')
        const { userid, groupid, content, timestamp, pointtotal, title } = req.body;

        db.create_post([userid, groupid, content, timestamp, pointtotal, title])
            .then( data=> {
                console.log('consolelog',data)
                res.status(200).send("??")
            }).catch(() => res.status(500).send('Something went wrong creating this post.'));
    },
    updatePost: (req, res, next) => {
        const db = req.app.get('db')
        const { userid, postid, groupid, content, timestamp, pointtotal, title, published } = req.body;
        db.update_post([userid, postid, groupid,  content, timestamp, pointtotal, title, published  ])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong updating this post.'))
    },
    createGroup: (req, res, next) => {
        const db = req.app.get('db')
        db.create_group([req.body.diseaseid, req.body.name])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong creating group.'))
    },
    updateGroup: (req, res, next) => {
        const db = req.app.get('db')
        db.update_group([req.body.groupid, req.body.diseaseid, req.body.name])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong updating group.'))
    },
    postComment: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.post_comment([body.userid, body.postid, body.comment, body.timestamp])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('There was a problem posting your comment.'))
    },
    updateComment: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_comment([ body.commentid, body.comment])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('There was a problem editing your comment.'))
    },
    upvotePost: (req, res, next) => {
        const db = req.app.get('db')
        db.upvote_post([req.body.postid, req.body.pointtotal])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('There was a problem upvoting this post.'))
    },
    upvoteComment: (req, res, next) => {
        const db = req.app.get('db')
        db.upvote_comment([req.body.commentid, req.body.pointtotal])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('There was a problem upvoting this comment.'))
    },
    getPost: (req, res, next) => {
        const db = req.app.get('db')
        db.get_post([req.params.id])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong retreiving the post'))
    }


}