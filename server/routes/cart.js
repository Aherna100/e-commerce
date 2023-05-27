const express = require('express');
const { getOrderbyId } = require('../controllers/OrderService');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
});

module.exports = (app, passport) => {
    app.use('/api', router);

    router.get('/config', (req, res) => {
        res.send({
            publishableKey: process.env.STRIPE_PUBLISH_KEY
        })
    });

    router.post('/create_payment', async (req, res) => {
        const { total } = req.body;
        const nNum = Number(total) * 100
        try {

            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'USD',
                amount: nNum,
                automatic_payment_methods: { enabled: true }
            });

            res.send({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    });
}