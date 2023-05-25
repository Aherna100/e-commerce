import React, { useEffect } from "react";
import { useGetItemProductQuery } from "../../api/apiSlice";

import { Container, Button, Placeholder, Card, Stack } from 'react-bootstrap';

import { run as runHolder } from 'holderjs/holder';
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { id } = useParams();
    const {
        data: product,
        isFetching,
        isSuccess
    } = useGetItemProductQuery(id);

    useEffect(() => {
        runHolder('image-class-name');
    }, []);
    let content;

    if (isFetching) {
        content = (<Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" width='5rem' height='5rem' />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>);
    } else if (isSuccess) {
        content = (
            <Container className="mt-5  text-center" style={{ padding: '3rem', width: '30rem' }}>
                <Stack gap={3}>
                    <h1>{product.title}</h1>
                    <img src="holder.js/100px180" width='5rem' height='5rem' alt={product.title} />
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <Button variant="primary">Add to Cart</Button>
                </Stack>
            </Container>
        )
    }

    return (
        <section>
            {content}
        </section>
    );
}

export default ProductPage;