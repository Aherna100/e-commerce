const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

module.exports = (app) => {
    const whitelist = ['http://localhost:3000']

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed"))
            }
        }
    }

    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(
        session({
            secret: process.env.SECRET_SESSION,
            cookie: {
                maxAge: 1000 * 60 * 60,
                secure: false
            },
            resave: false,
            saveUninitialized: false, //true
        })
    );

    return app;
}