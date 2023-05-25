const controllers = require('../controllers/ProductService');
const express = require('express');
const router = express.Router();

module.exports = (app, passport) => {
    const jwtRequired = passport.authenticate('jwt', { session: false });
    app.use('/api/product', router);

    router.get('/', async (req, res) => {
        const page = req.query.page;
        const limit = req.query.limit;
        const response = await controllers.getProductsLimit({ page, limit });
        res.status(200).send(response);
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await controllers.getProductbyId(id);
        res.status(200).send(response);
    });

    router.post('/newproduct', async (req, res) => {
        const data = req.body;
        const response = await controllers.createProduct(data);
        res.status(200).send(response);
    });

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { title, description, price } = req.body;
        await controllers.updateProduct({ id, title, description, price })
            .then(() => res.sendStatus(200));
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await controllers.deleteProduct(id)
            .then(() => res.sendStatus(200));
    })
}