module.exports = {
    register: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.register_user([body.userid, body.displayname, body.firstname, body.lastname, body.state, body.city])
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Could not register user'));
    },
    getUserCredentials: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user_credentials(req.params.id)
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Could not retrieve user credentials'));
    },
    getUserInfo: (req, res, next) => {
        const db = req.app.get('db')
        const { params } = req;

        db.get_user_info([params.id])
            .then(data => {
                res.status(200).send(data)
                console.log('ctrl', data)
            }).catch(() => res.status(500).send('Could not retrieve user info'));
    },
    updateGroups: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_groups([body.userid, body.groupid])
            .then(data => {
                res.status(200).send("Groups Updated")
            }).catch(() => res.status(500).send('Oops! Something went wrong updating groups'));
    },

    updateInterests: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_interests([body.userid, body.interestid])
            .then(data => {
                res.status(200).send("Interesting... this was successful")
            }).catch(() => res.status(500).send('Oops! Something went wrong updating interests'));
    },
    updateDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_user_diseases([body.userid, body.diseaseid])
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Oops! Something went wrong updating diseases'));
    },
    getDiseases: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.get_diseases()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Oops! Cannot get diseases right now'));
    },
    getInterests: (req, res, next) => {
        const db = req.app.get('db')
        db.get_interests()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Oops! Cannot get interests right now'));
    },
    getGroups: (req, res, next) => {
        const db = req.app.get('db')
        db.get_groups()
            .then(data => {
                res.status(200).send(data)
            }).catch(() => res.status(500).send('Oops! Cannot get groups right now'));
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
        db.upvote_post([req.body.postid, req.body.userid])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('There was a problem upvoting this post.'))
    },
    upvoteComment: (req, res, next) => {
        const db = req.app.get('db')
        db.upvote_comment([req.body.commentid, req.body.userid])
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
    },
    getComments: (req, res, next) => {
        const db = req.app.get('db')
        db.get_comments([req.params.id])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong retreiving the comments for this post'))
    },
    deleteComment: (req, res, next) => {
        const db = req.app.get('db')
        db.delete_comment([req.params.id])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong deleting the comment'))
    },
    createEvent: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.create_event([body.groupid, body.name, body.description,	body.date,	body.starttime,	body.endtime, body.image, body.city, body.state, body.location])
        // console.log([body.groupid, body.name, body.description,	body.date,	body.starttime,	body.endtime, body.image, body.city, body.state, body.location])
        .then( data => {
            
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong creating this event'))
    },
    updateEvent: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.update_event([ body.name, body.description,	body.date,	body.starttime,	body.endtime, body.image, body.city, body.state, body.location, body.eventid])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong updating this event.') )
    },
    createReply: (req, res, next) => {
        const db = req.app.get('db')
        const body = req.body;
        db.create_reply([body.userid, body.commentid, body.content, body.timestamp])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong creating this reply.'))
    },
    deleteReply: (req, res, next) => {
        const db = req.app.get('db')
        db.delete_reply([req.params.id])
        .then(data => {
            res.status(200).send( data )
        }).catch( () => res.status(500).send('Something went wrong deleting this reply.'))
    },
    getMessages: (req, res, next) => {
        const db = req.app.get('db')
        db.get_users_messages([req.params.id])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong retrieving messages.'))
    },
    createMessage: (req, res, next) => {
        const db = req.app.get('db')
        db.send_message([req.body.senderid, req.body.receiverid, req.body.content, req.body.timestamp])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong sending the message.'))
    },
    deleteMessage: (req, res, next) => {
        const db = req.app.get('db')
        db.delete_message([req.params.id])
        .then(data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong deleting this message.'))
    },
    getAllPosts: (req, res, next) => {
        const db = req.app.get('db')
        db.get_all_posts()
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong getting all posts.'))
    },
    getConversation: (req, res, next) => {
        const db = req.app.get('db')
        db.get_users_conversation([req.params.active_user_id, req.params.friend_user_id])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong retreiving this conversation.'))
    },
    downVoteComment: (req, res, next) => {
        const db = req.app.get('db')
        db.down_vote_comment([req.body.commentid, req.body.pointtotal])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send('Something went wrong unliking this comment.'))
    },
    getReplies: (req, res, next) => {
        const db = req.app.get('db')
        db.get_replies([req.params.id])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send("Something went wrong getting replies."))
    },
    addFriend: (req, res, next) => {
        const db = req.app.get('db')
        db.add_friends([req.body.active_user_id, req.body.friend_user_id])
            
        .then(data => {
            res.status(200).send('Added New Friend.')
        }).catch( () => res.status(500).send('Something went wrong adding this friend.'))
    },
    searchUsers:()=>{

    },
    getFriends: (req, res, next) => {
        const db = req.app.get('db')
        db.get_friends([req.params.id])
        .then( data => {
            res.status(200).send(data)
        }).catch( () => res.status(500).send("Something went wrong getting friends."))
    },

    getAllUsers: ((req, res, next) => {
        const db = req.app.get('db');
        db.get_all_users()
        .then(data => {
            res.status(200).send(data)
        }).catch((err) => res.status(500).send(err, 'Could not get all users.'))
    }),

    getAllMessages: ((req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params
        db.get_all_messages([id])
        .then(data =>{
            res.status(200).send(data)
        }).catch((err) => res.status(500).send(err, 'Could not get all messages.'))
    }),
    
    getAllEvents: ((req, res, next) => {
        const db = req.app.get('db');
        db.get_all_events()
        .then(data =>{
            res.status(200).send(data)
        }).catch((err) => res.status(500).send(err, 'Could not get all events.'))
    })
}