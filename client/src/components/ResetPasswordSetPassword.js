import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const ResetPasswordSetPassword = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  showPass,
  setShowPass,
  submitHandler,
  prevStep,
}) => {
  return (
    <Row className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <Card
          className="p-4
        "
        >
          <h1 className="mb-3">Set Password</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your desired password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirm-password" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password again"
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
            <Button type="submit" variant="primary" className="mb-3">
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordSetPassword;
