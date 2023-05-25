# E-Commerce App

This is an e-commerce application built with Node.js, React, Redux, Sequelize, and Stripe. It allows users to browse and purchase products online.

## Features

- User authentication: Users can sign up, log in, and log out to access their accounts and make purchases.
- Product catalog: Users can view a list of available products and their details.
- Shopping cart: Users can add products to their shopping cart and proceed to checkout.
- Payment processing: The app integrates with Stripe to securely process payments.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building server-side applications.
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A Redux predictable state container for JavaScript apps.
- **Sequelize**: A promise-based ORM (Object-Relational Mapping) for Node.js, used for interacting with the database.
- **Stripe**: A popular payment processing platform that allows secure and easy online transactions.

## Installation

1. Clone the repository:
  ```
  bash
  git clone https://github.com/aherna100/e-commerce.git
  ```
2. Install the dependencies for the server:
  ```
  cd e-commerce-app/server
  npm install
  ```
3. Install the dependencies for the client:
  ```
  cd ../e-commerce-app
  npm install
  ```
4. Set up environment variables:
  ```
  Create a .env file in the server directory and provide the necessary configuration variables for the database and Stripe API keys
  ```
5. Run the application:
  ```
  # Start the server
  cd ../server
  npm start

  # Start the client
  cd ../
  npm start
  ```
6. Open your browser and navigate to http://localhost:3000 to access the app.