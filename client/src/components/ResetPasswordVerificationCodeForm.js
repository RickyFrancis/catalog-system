import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const ResetPasswordVerificationCodeForm = ({
  email,
  verificationCode,
  setVerificationCode,
  verificationCodeSubmitHandler,
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
          <Form onSubmit={verificationCodeSubmitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mb-3">
              Submit
            </Button>
            <br />
            <small>
              A verification code was sent to your email <mark>{email}</mark>
            </small>
            <br />
            <Button
              variant="link"
              onClick={(e) => prevStep(e)}
              size="sm"
              className="p-0"
            >
              Change Email
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordVerificationCodeForm;
