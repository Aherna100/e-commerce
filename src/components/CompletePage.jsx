import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CompletePage = () => {
    return (
        <Container className="my-5 text-center">
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase.</p>
            <p>Your order will be processed and shipped soon.</p>
            <Button variant="primary" as={Link} to="/">
                Continue Shopping
            </Button>
        </Container>
    );
}

export default CompletePage;