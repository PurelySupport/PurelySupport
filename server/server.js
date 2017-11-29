require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(cors())

// this is all of the auth0 stuff
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        console.log(profile)


        const db = app.get('db')

        db.find_user([profile.identities[0].user_id]).then(user => {
            if (user[0]) {
                // console.log('TEST',user[0])
                return done(null, user[0].userid)
            } else {
                const user = profile._json
                db.create_user([user.name, user.email, user.picture, user.identities[0].user_id])
                    .then(user => {
                        return done(null, user[0].userid)
                    })
            }

        })
    }))

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        return res.status(404).send('User Not Found')
    }
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, process.env.REACT_APP_LOGOUT)
})

passport.serializeUser(function (userid, done) {
    done(null, userid);
})

passport.deserializeUser(function (userid, done) {
    app.get('db').find_current_user([userid])
        .then(user => {
            done(null, user[0])
        })
})


//31 endpoints
//^^^WORKING ^^^
app.put('/api/register', userController.register);

app.get('/api/getusercredentials/:id', userController.getUserCredentials);//

app.get('/api/getuserinfo/:id', userController.getUserInfo);//

app.put('/api/updategroups', userController.updateGroups);

app.put('/api/updateinterests', userController.updateInterests);

app.put('/api/updatediseases', userController.updateDiseases);

app.get('/api/getdiseases', userController.getDiseases);//

app.get('/api/getinterests', userController.getInterests);//

app.get('/api/getgroups', userController.getGroups);//

app.post('/api/createpost', userController.createPost);//

// upvote post, upvote comment

app.put('/api/updatepost', userController.updatePost);//

app.post('/api/creategroup', userController.createGroup);//

app.put('/api/updategroup', userController.updateGroup);//

app.post('/api/postcomment', userController.postComment);//

app.put('/api/updatecomment', userController.updateComment);//

app.put('/api/upvotepost/:id', userController.upvotePost);//

app.put('/api/upvotecomment', userController.upvoteComment);//

app.put('/api/downvotecomment/', userController.downVoteComment);//

app.get('/api/getpost/:id', userController.getPost);//

app.get('/api/getcomments/:id', userController.getComments);//

app.put('/api/deletecomment/:id', userController.deleteComment);//

app.post('/api/createevent/', userController.createEvent);//

app.put('/api/updateevent', userController.updateEvent);//

app.post('/api/createreply', userController.createReply);//

app.put('/api/deletereply/:id', userController.deleteReply);//

app.get('/api/messages/:id', userController.getMessages);//

app.post('/api/createmessage', userController.createMessage);//

app.put('/api/deletemessage/:id', userController.deleteMessage);//

app.get('/api/allposts', userController.getAllPosts);//

app.get('/api/getreplies/:id',userController.getReplies);//

app.get('/api/getconversation/:active_user_id/:friend_user_id', userController.getConversation);//

app.put('/api/addfriend',userController.addFriend);

app.get('/api/getusers', userController.getAllUsers);

app.get('/api/getallmessages/:id', userController.getAllMessages);

app.get('/api/getallevents', userController.getAllEvents);


// app.post('/api/payment', function (req, res, next) {
//   //convert amount to pennies
//   const amountArray = req.body.amount.toString().split('');
//   const pennies = [];
//   for (var i = 0; i < amountArray.length; i++) {
//     if (amountArray[i] === ".") {
//       if (typeof amountArray[i + 1] === "string") {
//         pennies.push(amountArray[i + 1]);
//       } else {
//         pennies.push("0");
//       }
//       if (typeof amountArray[i + 2] === "string") {
//         pennies.push(amountArray[i + 2]);
//       } else {
//         pennies.push("0");
//       }
//       break;
//     } else {
//       pennies.push(amountArray[i])
//     }
//   }
//   const convertedAmt = parseInt(pennies.join(''));

//   const charge = stripe.charges.create({
//     amount: convertedAmt, // amount in cents, again
//     currency: 'usd',
//     source: req.body.token.id,
//     description: 'Test charge from react app'
//   }, function (err, charge) {
//     if (err) return res.sendStatus(500)
//     return res.sendStatus(200);
//     // if (err && err.type === 'StripeCardError') {
//     //   // The card has been declined
//     // }
//   });
// });

const PORT = 3001
app.listen(PORT, () => console.log(`Server on port ${PORT},`))