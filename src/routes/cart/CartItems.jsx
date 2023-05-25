import React from "react";
import { useDeleteItemMutation, useGetItemProductQuery, useUpdateOrderQuantityMutation } from "../../api/apiSlice";
import { Button } from 'react-bootstrap';

const CartItems = ({ item, orderId, index }) => {

    const { data: product, isLoading } = useGetItemProductQuery(item.productId);
    const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();
    const [updateOrderQuantity, { lisLoading: isUpdading }] = useUpdateOrderQuantityMutation();

    const productId = item.productId;

    const handleAdd = () => {
        let newQ = item.quantity + 1;
        updateOrderQuantity({ orderId, productId, quantity: newQ });
    }

    const handleRemove = () => {
        let newQ = item.quantity - 1;
        if (newQ <= 0) {
            deleteItem(productId);
        } else {
            updateOrderQuantity({ orderId, productId, quantity: newQ });
        }
    }

    return (
        <tbody className="text-center">
            {!isLoading ?
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{(product.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Button variant="secondary" onClick={() => handleAdd()} disabled={isUpdading}>+</Button>
                            <Button variant="secondary" onClick={() => handleRemove()} disabled={isUpdading}>-</Button>
                            <Button variant="danger" onClick={() => deleteItem(productId)} disabled={isDeleting}>Remove</Button>
                        </div>
                    </td>
                </tr> :
                <tr key={index}>
                    <td>loading</td>
                </tr>}
        </tbody>
    );
}

export default CartItems;

