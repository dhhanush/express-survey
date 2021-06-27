const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            return done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
          }
        })
        .catch((err) => console.log(err));
      // const newUser = new User({ googleId: profile.id });
      // newUser
      //   .save()
      //   .then((user) => {
      //     return done(null, user);
      //   })
      //   .catch((err) => console.log(err));
    }
  )
);
