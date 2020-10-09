const { Strategy } = require("passport-jwt")
const { ExtractJwt } = require("passport-jwt")
const mongoose = require("mongoose");
const { User } = mongoose.model("users");
const { Keys } = require("@Config");
// const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secret;

module.exports = configPassport = (passport) =>
{
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user)
                        return done(null, user);
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    )
}