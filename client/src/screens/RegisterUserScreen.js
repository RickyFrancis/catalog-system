import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import RegisterUserForm from '../components/RegisterUserForm';
import VerifyUserEmailForm from '../components/VerifyUserEmailForm';
import { register, verifyUserEmail } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const {
    loading: loadingVerify,
    error: errorVerify,
    userInfo: userInfoVerify,
  } = userVerifyEmail;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loadingLogin,
    error: errorLogin,
    userInfo: userInfoLogin,
  } = userLogin;

  // const redirect = location.search ? location.search.split('=')[1] : '/verify';

  useEffect(() => {
    if (userInfoLogin) {
      history.push('/');
    }
  }, [history, userInfo, userInfoLogin]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      dispatch(register(name, email, password, nextStep));
    }
  };

  const verificationCodeSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(verifyUserEmail(userInfo.user._id, verificationCode));
  };

  // Proceed to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to previous step
  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {errorVerify && <Message variant="danger">{errorVerify}</Message>}
      {loading && <Loader />}
      {loadingVerify && <Loader />}

      {step === 1 && (
        <RegisterUserForm
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          showPass={showPass}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setShowPass={setShowPass}
          submitHandler={submitHandler}
        />
      )}
      {step === 2 && (
        <VerifyUserEmailForm
          email={email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          verificationCodeSubmitHandler={verificationCodeSubmitHandler}
          prevStep={prevStep}
        />
      )}
    </>
  );
};

export default RegisterScreen;
