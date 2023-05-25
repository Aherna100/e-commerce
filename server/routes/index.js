const authRouter = require('./auth');
const userRouter = require('./user');
const ordersRouter = require('./orders');
const productRouter = require('./product');
const cartRouter = require('./cart');
module.exports = (app, passport) => {
    authRouter(app, passport);
    userRouter(app, passport);
    ordersRouter(app, passport);
    productRouter(app, passport);
    cartRouter(app, passport);
}