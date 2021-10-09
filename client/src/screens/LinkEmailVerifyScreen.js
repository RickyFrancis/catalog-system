import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { verifyUserEmail } from '../actions/userActions';

const LinkEmailVerifyScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const id = match.params.id;

  const code = match.params.code;

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const {
    loading: loadingVerify,
    error: errorVerify,
    userInfo: userInfoVerify,
  } = userVerifyEmail;

  useEffect(() => {
    if (userInfoVerify) {
      history.push('/');
    } else dispatch(verifyUserEmail(id, code));
  }, [history, userInfoVerify]);

  return (
    <>
      {errorVerify && <Message variant="danger">{errorVerify}</Message>}
      {loadingVerify && <Loader />}
      <FormContainer className="mt-5">
        <h1 className="mb-3">Please wait while your email is being verified</h1>
      </FormContainer>
    </>
  );
};

export default LinkEmailVerifyScreen;
