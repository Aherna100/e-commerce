import { useEffect, useState } from "react"
import { useGetOrderDetailsQuery, useGetOrderItemsQuery } from "../../api/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const useLoadTst = () => {
    const [exists, setExists] = useState();
    const [quantity, setQuantity] = useState([]);
    const [total, setTotal] = useState(0);

    const { data: order } = useGetOrderItemsQuery();
    const { data: product } = useGetOrderDetailsQuery(order ? order.id : skipToken);

    const orderId = order ? order.id : null;

    useEffect(() => {
        return setTotal(quantity.reduce((preValue, currentValue) => preValue + (currentValue.quantity * currentValue.Product.price), 0).toFixed(2))
    }, [quantity]);

    useEffect(() => {
        if (product) {
            setQuantity(product);
        }
    }, [product]);

    useEffect(() => {
        if (order) {
            const result = order.orderDetails.length ? true : false;
            setExists(result);
        }

    }, [order]);


    return { exists, total, orderId };
}