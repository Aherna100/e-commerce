import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../../actions/authAction';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, success } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (success) {
      navigate('/login')
    }
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate, success, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      throw new Error('No username or password');
    }
    const data = {
      username: email,
      password
    }
    dispatch(userSignup(data));
  };

  return (
    <Container className="mt-5" style={{ padding: '3rem', width: '30rem' }}>
      <div className='container-sm mt-3 text-center'>
        <h1>Signup</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container >
  );
};

export default SignupPage;
