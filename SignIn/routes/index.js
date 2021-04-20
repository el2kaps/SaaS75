const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt');
const JWT_SECRET = 'top-secret';

passport.use('signin', new LocalStrategy(function (username,password,done){
  if (username !== 'nickie' || password !== 'secret') {
    return done (null,false);
  }
  return done(null, { username: username}) //epistrefw auto apo th bash
}))

passport.use('token', new JWTstrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function (token,done) {
        return done(null, {username: token.username })
    }
));

//post sign in
//post oxi get gt den thelw na ta balw sto url to usrname k passw
//epeidh o browser kanei get prepei na to dokimasw me to postman
router.post('/signin',
    passport. authenticate('signin', {session: false}), function(req, res, next) {
    res.json( {
      user: username,
      timestamp: Date.now(), //den einai kruptografhmena prosoxh
      token: jwt.sign(req.user, JWT_SECRET, { expiresIn: 3600 })
    });
  }
);

//get whoami
router.get('/whoami', passport.authenticate('token', { session: false }),
    function (req, res, next){
        res.json({ user: req.user });
    }
    );



module.exports = router;
