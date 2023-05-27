const { orderDetails, Orders, Product } = require('../models');
const createError = require('http-errors');
const { Op } = require("sequelize");

const createOrder = async (data) => {
    try {
        const { customerId } = data;

        const order = await Orders.create({
            customerId,
            orderStatus: "progress"
        });

        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const addItemCart = async (id, data) => {
    try {
        let response = await getOrderBycId(id);
        if (!response) {
            response = await Orders.create({
                customerId: id,
                orderStatus: "progress"
            });
        }
        const newItem = await orderDetails.create({
            orderId: response.dataValues.id, ...data
        });
        return newItem;
    } catch (err) {
        throw createError(500, err);
    }
}

const getOrderbyId = async (data) => {
    try {
        const order = await orderDetails.findAll({
            where: {
                orderId: data
            },
            include: Product
        });
        if (!order) {
            throw createError(409, 'Theres no order with that id');
        }

        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const getOrderBycId = async (data) => {
    try {
        const order = await Orders.findOne({
            where: {
                [Op.and]: [
                    { customerId: data },
                    { orderStatus: "progress" }
                ]
            },
            include: orderDetails
        });
        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const deleteOrder = async (data) => {
    try {
        const order = await Orders.destroy({
            where: {
                id: data
            }
        });
        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const deleteItem = async (data) => {
    try {
        const { id, itemId } = data;
        Orders.findOne({
            where: {
                customerId: id
            }
        })
            .then((response) => orderDetails.destroy({
                where: {
                    orderId: response.dataValues.id,
                    productId: itemId
                }
            })).then(result => result)
    } catch (err) {
        throw createError(500, err)
    }
}

const updateOrderStatus = async (orderId) => {
    try {
        const order = await Orders.update({ orderStatus: "complete" }, {
            where: {
                id: orderId
            }
        });
        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const updateItem = async (data) => {
    try {
        const { orderId, productId, quantity } = data;
        const order = orderDetails.update({ quantity }, {
            where: {
                orderId,
                productId
            }
        });
        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

module.exports = {
    createOrder,
    getOrderbyId,
    getOrderBycId,
    deleteOrder,
    updateItem,
    deleteItem,

    updateOrderStatus,

    addItemCart
}