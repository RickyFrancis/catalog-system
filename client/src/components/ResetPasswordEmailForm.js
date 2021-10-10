import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const ResetPasswordEmailForm = ({
  email,
  setEmail,
  emailSubmitHandler,
  prevStep,
}) => {
  return (
    <Row className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <Card
          className="p-4
        "
        >
          <h1 className="mb-3">Verify Email</h1>
          <Form onSubmit={emailSubmitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
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

export default ResetPasswordEmailForm;
