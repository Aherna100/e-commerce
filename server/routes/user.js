const controllers = require('../controllers/UserService');
const express = require('express');
const router = express.Router();

module.exports = (app, passport) => {

    app.use('/api/users', router);

    router.get('/users', controllers.getAllUsers);

    router.get('/:id', controllers.getUserById);

    router.put('/:id', controllers.updateUser);

    router.delete('/:id', controllers.deleteUser);

}