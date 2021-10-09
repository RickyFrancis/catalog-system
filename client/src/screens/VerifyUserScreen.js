import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register, verifyUserEmail } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';

const VerifyScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState(null);

  const [verificationCode, setVerificationCode] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loadingLogin,
    error: errorLogin,
    userInfo: userInfoLogin,
  } = userLogin;

  // const redirect = location.search ? location.search.split('=')[1] : '/verify';

  // useEffect(() => {
  //   if (userInfo || userInfoLogin) {
  //     history.push(redirect);
  //   }
  // }, [history, userInfo, userInfoLogin, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      dispatch(register(name, email, password));
    }
  };

  const changeEmailHandler = () => {
    // dispatch({ type: USER_REGISTER_RESET });
    history.push('/register');
  };

  return (
    <Row className="mt-5">
      <Col md={{ span: 4, offset: 4 }}>
        <Card
          className="p-4
        "
        >
          <h1 className="mb-3">Verify Email</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <span>
              A verification code was sent to your email {userInfo?.user?.email}{' '}
              <Link onClick={changeEmailHandler}>Change Email</Link>
            </span>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default VerifyScreen;
