import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { userLogin } from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (!username || !password) {
      throw new Error('No username or password');
    }

    const data = {
      username,
      password
    }
    dispatch(userLogin(data));
  };

  // const handleFacebookLogin = () => {
  //   window.open("http://localhost:3500/api/auth/facebook", "_self");
  // }

  // const handleGithubLogin = () => {
  //   window.open("http://localhost:3500/api/auth/github", "_self");
  // }

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo])

  return (
    <Container className="mt-5" style={{ padding: '3rem', width: '30rem' }}>
      <div className='container-sm mt-3 text-center'>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username address</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
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
            Sign up
          </Button>
          <div style={{ display: "flex" }}>
            <div className='container-sm mt-3'>
              <Button variant="dark" href="api/auth/github">Github</Button>
              {/* <button className="btn btn-dark mb-3" onClick={handleGithubLogin} >Sign up with Github</button> */}
            </div>
            <div className='container-sm mt-3'>
              <Button variant="dark" href="api/auth/facebook">Facebook</Button>
              {/* <button className="btn btn-dark mb-3" onClick={handleFacebookLogin} >Sign up with Facebook</button> */}
            </div>
          </div>

        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
