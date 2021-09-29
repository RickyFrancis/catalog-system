import axios from 'axios';
import {
  CATALOG_LIST_REQUEST,
  CATALOG_LIST_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_DETAILS_REQUEST,
  CATALOG_DETAILS_SUCCESS,
  CATALOG_DETAILS_FAIL,
  CATALOG_DELETE_SUCCESS,
  CATALOG_DELETE_REQUEST,
  CATALOG_DELETE_FAIL,
  CATALOG_CREATE_FAIL,
  CATALOG_CREATE_SUCCESS,
  CATALOG_CREATE_REQUEST,
  CATALOG_UPDATE_FAIL,
  CATALOG_UPDATE_SUCCESS,
  CATALOG_UPDATE_REQUEST,
  CATALOG_CREATE_REVIEW_FAIL,
  CATALOG_CREATE_REVIEW_SUCCESS,
  CATALOG_CREATE_REVIEW_REQUEST,
  CATALOG_TOP_REQUEST,
  CATALOG_TOP_SUCCESS,
  CATALOG_TOP_FAIL,
} from '../constants/catalogConstants';

// export const listProducts =
//   (keyword = '', pageNumber = '') =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: CATALOG_LIST_REQUEST });
//       const { data } = await axios.get(
//         `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
//       );

//       dispatch({
//         type: CATALOG_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: CATALOG_LIST_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//     };

export const listCatalogs =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CATALOG_LIST_REQUEST });
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_start=${0}&_limit=${pageNumber}`
      );

      dispatch({
        type: CATALOG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATALOG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATALOG_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CATALOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATALOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: CATALOG_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATALOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: CATALOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATALOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: CATALOG_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATALOG_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: CATALOG_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CATALOG_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: CATALOG_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: CATALOG_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
