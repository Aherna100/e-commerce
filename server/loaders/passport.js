const passport = require('passport');
const userService = require('../controllers/UserService');
const { ExtractJwt } = require('passport-jwt');

const session = require('express-session');

const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2');
const services = require('../controllers/AuthService');
// const Auth0Strategy = require('passport-auth0');
const JwtStrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook');

module.exports = async (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy('local', async (username, password, done) => {
        try {

            const user = await services.loginUser({ username, password });

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, cb) => {
        process.nextTick(() => {
            cb(null, { id: user.id, username: user.username });
        });

    });

    passport.deserializeUser((obj, done) => {
        process.nextTick(async () => {
            let data = await userService.getUserById(obj.id);
            if (!data) {
                return done(new Error('User not found'))
            }
            done(null, data);
        })
    });

    // passport.use(new Auth0Strategy({
    //     domain: 'dev-w4zhhnywnwems2gz.us.auth0.com',
    //     clientID: 'jfozbTa6g05IyfRIxj53K0ISt7XnBIId',
    //     clientSecret: '4C3hGslBqnFA0kSq/PKuugdWeKs1XFAs1rG+hBp+hvQ=',
    //     callbackURL: 'http://localhost:3500/auth/callback'
    // },
    //     (accessToken, refreshToken, extraParams, profile, done) => {
    // const authenticate = async = () => {
    //     let user = null;

    //     if(req.user){
    //         user = services.loginUser();
    //     }
    // }
    //         return done(null, profile);
    //     }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GIT_CLIENT_ID,
        clientSecret: process.env.GIT_HUB__SECRET_ID,
        callbackURL: "http://localhost:3500/api/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await services.githubLogin(profile)
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3500/api/auth/facebook/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await services.facebookLogin(profile);
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTkey,
    },
        (payload, done) => {
            userService.getUserById(payload.id)
                .then(user => {
                    return done(null, user);
                }).catch(err => {
                    return done(err, false, {
                        message: "No matching Token"
                    })
                })
        }));

    return passport;
}