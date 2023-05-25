const { Product } = require('../models');
const createError = require('http-errors');

const getProductbyId = async (data) => {
    try {
        const product = await Product.findOne({
            where: {
                id: data
            }
        });
        if (!product) {
            throw createError(409, 'Theres no product with that id');
        }
        return product;
    } catch (err) {
        throw createError(500, err)
    }
}

const getProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (err) {
        throw createError(500, err);
    }
}

const getProductsLimit = async (data) => {
    try {
        const { limit, page } = data;
        let offset = page * limit;
        const products = await Product.findAndCountAll({
            offset,
            limit
        });
        return products;
    } catch (err) {
        throw createError(500, err);
    }
}

const createProduct = async (data) => {
    try {
        const { title, description, price } = data;

        const product = await Product.create({
            title: title,
            description: description,
            price: price
        });
        return product;
    } catch (err) {
        throw createError(500, err);
    }
}

const updateProduct = async (data) => {
    try {
        const { id, title, description, price } = data;

        const product = Product.update({
            title: title,
            description: description,
            price: price
        }, { where: { id: id } });
        return product;

    } catch (err) {
        throw createError(500, err)
    }
}

const deleteProduct = async (data) => {
    try {
        const product = await Product.destroy({
            where: {
                id: data
            }
        });
        return product;
    } catch (err) {
        throw createError(500, err);
    }
}

module.exports = {
    getProducts,
    getProductbyId,
    createProduct,
    updateProduct,
    deleteProduct,

    getProductsLimit
}