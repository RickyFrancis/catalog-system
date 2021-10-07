import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, InputGroup, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    // <FormContainer>
    <Row className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <Card
          className="p-4
        "
        >
          <h1 className="mb-3">Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  variant="outline-secondary"
                  onClick={(e) => setShowPass(!showPass)}
                >
                  <i className="fas fa-eye"></i>
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
          <Row className="py-3">
            <span>
              New user? &nbsp;
              <Link to={`/register`}>Register</Link> | Forgot password?{' '}
              <Link to={`/reset`}>Reset</Link>
            </span>
          </Row>
        </Card>
      </Col>
    </Row>
    // {/* </FormContainer> */}
  );
};

export default LoginScreen;
