import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { useGetOrderItemsQuery } from '../../api/apiSlice';
import CartItems from './CartItems';
import { useLoadTst } from '../../components/hooks/useLoadTst';

const CartPage = () => {
  const navigate = useNavigate();
  const { exists, total, orderId } = useLoadTst();
  const {
    data: items,
  } = useGetOrderItemsQuery();

  return (
    <Container className="my-5">
      <h1>Shopping Cart</h1>
      {
        exists ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              {items.orderDetails.map((item, index) => {
                return <CartItems item={item} key={index} index={index} orderId={orderId} />
              })}
            </Table>
            <div className="text-right">
              <h4>Total: $ {total}</h4>
              <Button variant="primary" onClick={() => navigate('/payment')}>Checkout</Button>
            </div>
          </>
        ) : (
          <h1>There's no items in the Cart</h1>
        )
      }

    </Container>
  );
};

export default CartPage;
