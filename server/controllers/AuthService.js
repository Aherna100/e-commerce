const { User } = require('../models');
const createError = require('http-errors');

const createUser = async (data) => {
    try {
        const { username, password } = data;

        let user = await User.findOne({
            where: { username }
        });

        if (user) {
            throw createError(409, 'Email already in use');
        }

        user = await User.create({ username, password });

        return user;

    } catch (err) {
        throw createError(500, err);
    }
}

const loginUser = async (data) => {
    const { username, password } = data;
    try {
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            throw createError(401, 'Incorrect Username of Password');
        }

        if (user.password !== password) {
            throw createError(401, 'Incorrect Username of Password');
        }

        return user;
    } catch (err) {
        throw createError(500, err);
    }
}

const githubLogin = async (data) => {
    try {
        const { username } = data;

        let user = await User.findOne({
            where: { username }
        });

        if (!user) {
            user = await User.create({ username });
        }
        return user;
    } catch (error) {
        throw createError(500, error);
    }
}

const facebookLogin = async (data) => {
    try {
        const { displayName } = data;

        let user = await User.findOne({
            where: { username: displayName }
        });

        if (!user) {
            user = await User.create({ username: displayName });
        }
        return user;

    } catch (error) {
        throw createError(500, error);
    }
}

module.exports = {
    createUser,
    loginUser,
    githubLogin,
    facebookLogin
}