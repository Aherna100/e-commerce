const { orderDetails, Orders, Product } = require('../models');
const createError = require('http-errors');

const createOrder = async (data) => {
    try {
        const { customerId } = data;

        const order = await Orders.create({
            customerId
        });

        return order;
    } catch (err) {
        throw createError(500, err);
    }
}

const addItemCart = async (id, data) => {
    try {
        const orderId = await getOrderBycId(id);
        const newItem = await orderDetails.create({
            orderId: orderId.dataValues.id, ...data
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
                customerId: data
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

// const updateOrder = async (data) => {
//     try {
//         const { orderId, quantity } = data;
//         const order = await orderDetails.update({ quantity }, {
//             where: {
//                 orderId
//             }
//         });
//         return order;
//     } catch (err) {
//         throw createError(500, err);
//     }
// }

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

    addItemCart
}