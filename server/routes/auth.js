const express = require('express');
const services = require('../controllers/AuthService');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (app, passport) => {

    app.use('/api/auth', router);

    router.post('/register', async (req, res, next) => {
        try {
            const data = req.body;

            const response = await services.createUser(data);

            return res.status(200).json({ response })
        } catch (err) {
            next(err);
        }
    });

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const response = await services.loginUser({ username, password });

            const user = {
                id: response.dataValues.id,
                username: username,
            };

            const token = jwt.sign(user, process.env.JWTkey);

            res.status(200).json({ user, token });
        } catch (err) {
            next(err);
        }
    });

    router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

    router.get('/github/callback',
        passport.authenticate('github',
            {
                // successRedirect: process.env.CLIENT_URL,
                failureRedirect: '/login',
                failureMessage: true
            }), async (req, res) => {
                res.redirect(process.env.CLIENT_URL)
            });

    router.get('/facebook', passport.authenticate('facebook'));

    router.get('/facebook/callback',
        passport.authenticate('facebook',
            {
                // successRedirect: process.env.CLIENT_URL,
                failureRedirect: '/login',
                failureMessage: true
            }), async (req, res) => {
                res.redirect(process.env.CLIENT_URL)
            });


    // router.get('/login', passport.authenticate('auth0', {
    //     scope: 'openid email profile'
    // }), (req, res) => {
    //     res.redirect('/');
    // });

    // router.get('/callback', (req, res, next) => {
    //     passport.authenticate('auth0', (err, user) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         if (!user) {
    //             return res.redirect('/login');
    //         }
    //         console.log("Callback Succesfull");
    //         const userReturnObject = {
    //             username: user.username
    //         };

    //         req.session.jwt = jwt.sign(userReturnObject, process.env.JWTkey);
    //         return res.redirect('/');
    //     }, (req, res, next));
    // });

    // Router test routes

    // router.get('/login', (req, res) => {
    //     res.render('login');
    // });

    // router.get('/register', (req, res) => {
    //     res.render('register');
    // });

    // router.get('/logout', (req, res) => {
    //     req.session = null;
    //     req.logOut();
    //     // const homeUrl = encodeURIComponent('http://localhost:3000/');
    //     res.redirect('/auth/login');
    // })

    // const jwtRequired = passport.authenticate('jwt', { session: false });

    // function auth(req, res, next) {
    //     if (req.session.authenticated) {
    //         return next();
    //     } else {
    //         res.redirect(403, '/auth/login');
    //     }
    // }

    // router.get('/dashboard', jwtRequired, (req, res) => {
    //     res.render('dashboard');
    // });

    router.get('/current-session', (req, res) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) {
                res.status(401).send(false);
            } else if (req.isAuthenticated()) {
                res.status(200).send(req.user);
            } else if (user || req.isAuthenticated()) {
                res.status(200).send(user);
            } else {
                res.status(401).send(false);
            }
        })(req, res)
    });
}