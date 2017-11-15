require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
function(accessToken, refreshToken, extraParams, profile, done) {
    console.log(profile)


    const db = app.get('db')

    db.find_user([ profile.identities[0].user_id ]).then( user => {
        if (user[0]){
            return done(null, user[0].id)
        } else {
            const user = profile._json
            db.create_user([ user.name, user.email, user.picture, user.identities[0].user_id ])
            .then( user => {
                return done(null, user[0].id)
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
    if(!req.user){
        return res.status(404).send('User Not Found')
    } 
    return res.status(200).send(req.user);
})

app.get('/auth/logout', ( req, res ) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/')
})

passport.serializeUser( function( userid, done ) {
    done(null, userid);
})

passport.deserializeUser( function( userid, done ) {
    app.get('db').find_current_user([ userid ])
    .then( user => {
        done(null, user[0])
    })
})

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