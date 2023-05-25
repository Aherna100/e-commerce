import React, { useEffect } from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { run as runHolder } from 'holderjs/holder';
import { useAddItemOrderMutation } from "../../api/apiSlice";

const DashboardItem = ({ product }) => {
    const { id, title, description, price } = product;
    const [addItemOrder, { isLoading }] = useAddItemOrderMutation();

    useEffect(() => {
        runHolder('image-class-name');
    }, []);

    const handleAddItem = async () => {
        const data = {
            productId: id,
            quantity: 1
        }
        addItemOrder(data);
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {price}
                </Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary" onClick={() => handleAddItem()} disabled={isLoading}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );

}

export default DashboardItem;