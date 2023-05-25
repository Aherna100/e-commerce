import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const ErrorPage = ({ error }) => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    </Container>
  );
};

export default ErrorPage;
