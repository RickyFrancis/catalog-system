import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  verifyUserEmailResetPassword,
  verifyUserEmailSendCodePasswordReset,
  resetPassword,
} from '../actions/userActions';
import ResetPasswordEmailForm from '../components/ResetPasswordEmailForm';
import ResetPasswordVerificationCodeForm from '../components/ResetPasswordVerificationCodeForm';
import ResetPasswordSetPassword from '../components/ResetPasswordSetPassword';

const ResetPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const userPasswordResetVerifyEmail = useSelector(
    (state) => state.userPasswordResetVerifyEmail
  );
  const { loading, error, userInfo } = userPasswordResetVerifyEmail;

  const userPasswordResetVerifyCode = useSelector(
    (state) => state.userPasswordResetVerifyCode
  );
  const { loading: loadingVerify, error: errorVerify } =
    userPasswordResetVerifyCode;

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading: loadingPasswordReset, error: errorPasswordReset } =
    userPasswordReset;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

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
      dispatch(resetPassword(userInfo.user._id, password));
    }
  };

  const verificationCodeSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      verifyUserEmailResetPassword(
        userInfo.user._id,
        verificationCode,
        nextStep
      )
    );
  };

  const emailSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(verifyUserEmailSendCodePasswordReset(email, nextStep));
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
      {errorPasswordReset && (
        <Message variant="danger">{errorPasswordReset}</Message>
      )}
      {loading && <Loader />}
      {loadingVerify && <Loader />}
      {loadingPasswordReset && <Loader />}

      {step === 1 && (
        <ResetPasswordEmailForm
          email={email}
          setEmail={setEmail}
          emailSubmitHandler={emailSubmitHandler}
        />
      )}
      {step === 2 && (
        <ResetPasswordVerificationCodeForm
          email={email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          verificationCodeSubmitHandler={verificationCodeSubmitHandler}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ResetPasswordSetPassword
          password={password}
          confirmPassword={confirmPassword}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          showPass={showPass}
          setShowPass={setShowPass}
          submitHandler={submitHandler}
          prevStep={prevStep}
        />
      )}
    </>
  );
};

export default ResetPasswordScreen;
