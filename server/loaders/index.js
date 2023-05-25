const passportLoader = require('./passport');
const expressLoader = require('./express');
const routerLoader = require('../routes');

module.exports = async (app) => {
    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routerLoader(app, passport);

    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).send(err.message);
    })
}