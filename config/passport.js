const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const { account } = require("../model/index.model");





const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY,
  algorithms: ["HS256"]
};

const LogIn_JwtStrategy = (passport) => {
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    // console.log(jwt_payload);
    account.findOne({ _id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
      });
  }));
};


const Facebook_Strategy = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://127.0.0.1:5000/api/account/o-auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done);
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null, profile);
  }
));
}

module.exports = {
  LogIn_JwtStrategy,
  Facebook_Strategy
};
