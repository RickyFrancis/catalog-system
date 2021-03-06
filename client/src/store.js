import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import {
//   productListReducer,
//   productDetailsReducer,
//   productDeleteReducer,
//   productCreateReducer,
//   productUpdateReducer,
//   productReviewCreateReducer,
//   productTopRatedReducer,
// } from './reducers/productReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userPasswordResetVerifyEmailReducer,
  userPasswordResetVerifyCodeReducer,
  userPasswordResetReducer,
  userVerifyEmailReducer,
} from './reducers/userReducers';

import {
  catalogListReducer,
  catalogDetailsReducer,
  catalogCreateReducer,
  catalogDeleteReducer,
  catalogUpdateReducer,
} from './reducers/catalogReducers';

const reducer = combineReducers({
  catalogList: catalogListReducer,
  catalogDetails: catalogDetailsReducer,
  catalogDelete: catalogDeleteReducer,
  catalogCreate: catalogCreateReducer,
  catalogUpdate: catalogUpdateReducer,
  //   productReviewCreate: productReviewCreateReducer,
  //   productTopRated: productTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userPasswordResetVerifyEmail: userPasswordResetVerifyEmailReducer,
  userPasswordResetVerifyCode: userPasswordResetVerifyCodeReducer,
  userPasswordReset: userPasswordResetReducer,
  //   userDetails: userDetailsReducer,
  //   userUpdateProfile: userUpdateProfileReducer,
  //   userList: userListReducer,
  //   userDelete: userDeleteReducer,
  //   userUpdate: userUpdateReducer,
});

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : {};

// const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
//   ? JSON.parse(localStorage.getItem('paymentMethod'))
//   : {};

const initialState = {
  //   cart: {
  //     cartItems: cartItemsFromStorage,
  //     shippingAddress: shippingAddressFromStorage,
  //     paymentMethod: paymentMethodFromStorage,
  //   },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
