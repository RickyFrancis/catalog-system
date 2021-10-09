import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const RegisterUserForm = ({
  name,
  email,
  password,
  confirmPassword,
  showPass,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setShowPass,
  submitHandler,
}) => {
  return (
    <FormContainer className="mt-5">
      <h1 className="mb-3">Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPass ? 'text' : 'password'}
            placeholder="Enter your desired password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showPass ? 'text' : 'password'}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="showPassword">
          <Form.Check
            type="checkbox"
            label="Show password"
            onClick={() => setShowPass(!showPass)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account? &nbsp;
          <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterUserForm;
