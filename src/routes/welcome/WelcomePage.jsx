import React from 'react';
import { Container } from 'react-bootstrap';

const WelcomePage = () => {
  return (
    <Container className="mt-5" style={{padding: '3rem'}}>
      <div>
        <h1>Welcome to Our Commerce Page!</h1>
        <p>
          Thank you for visiting our commerce page. We offer a wide range of products to cater to your needs.
          Whether you're looking for electronics, clothing, home decor, or more, we've got you covered!
        </p>
        <p>
          Browse through our extensive collection, and find the perfect items to enhance your lifestyle.
          With our easy-to-use navigation and search functionality, shopping has never been easier.
        </p>
        <p>
          Take advantage of our special deals, discounts, and promotions to get the best value for your money.
          We strive to provide high-quality products at competitive prices.
        </p>
        <p>
          Should you have any questions or need assistance, our friendly customer support team is here to help.
          We value your satisfaction and aim to provide you with a seamless shopping experience.
        </p>
        <p>
          Start exploring our commerce page now and embark on an exciting shopping journey!
        </p>
      </div>
    </Container>
  );
};

export default WelcomePage;
