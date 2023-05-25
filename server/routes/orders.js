const controllers = require('../controllers/OrderService');
const express = require('express');
const router = express.Router();

module.exports = (app, passport) => {
    const jwtRequired = passport.authenticate('jwt', { session: false });
    app.use('/api/order', jwtRequired, router);

    // Get order by customer Id

    router.get('/', async (req, res) => {
        const { id } = req.user;
        const response = await controllers.getOrderBycId(id);
        res.status(200).send(response);
    });

    router.post('/neworder', async (req, res) => {
        const data = req.body;
        const response = await controllers.createOrder(data);
        res.status(200).send(response);
    });

    router.post('/neworder/items', async (req, res) => {
        const { id } = req.user;
        const data = req.body;
        const response = await controllers.addItemCart(id, data);
        res.status(200).send(response);
    });

    // Get order by order Id

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await controllers.getOrderbyId(id);
        res.status(200).send(response);
    });

    // router.delete('/:id', async (req, res) => {
    //     const { id } = req.params;
    //     await controllers.deleteOrder(id)
    //         .then(() => res.sendStatus(200));
    // });

    router.delete('/:itemId', async (req, res) => {
        const { itemId } = req.params;
        const { id } = req.user;
        await controllers.deleteItem({ id, itemId })
            .then(() => res.sendStatus(200));
    })

    router.put('/:orderId', async (req, res) => {
        const { orderId } = req.params;
        const { quantity, productId } = req.body;
        await controllers.updateItem({ orderId, productId, quantity })
            .then(() => res.sendStatus(200));
    });
}