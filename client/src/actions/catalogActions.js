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
  CATALOG_LIST_REMOVE_ITEM,
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
  (
    pageNumber = '',
    pageSize = '',
    sortBy = '',
    order = '',
    entryNumber = '',
    author = '',
    title = '',
    comments = '',
    date = ''
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATALOG_LIST_REQUEST });
      const config = {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmlja3kiLCJpc0FkbWluIjp0cnVlfQ.3SAosAkfh49GtFA1t30-7ImmoIKzAgbtxYsthn-R8wM',
        },
      };

      const { data } = await axios.get(
        `/api/entries?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&entryNumber=${entryNumber}&author=${author}&title=${title}&comments=${comments}&date=${date}`,
        config
      );

      dispatch({
        type: CATALOG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATALOG_LIST_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const listCatalogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATALOG_DETAILS_REQUEST });

    console.log(id);

    const config = {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmlja3kiLCJpc0FkbWluIjp0cnVlfQ.3SAosAkfh49GtFA1t30-7ImmoIKzAgbtxYsthn-R8wM',
      },
    };

    const { data } = await axios.get(`/api/entries/${id}`, config);

    dispatch({
      type: CATALOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATALOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const deleteCatalog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATALOG_DELETE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const config = {
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmlja3kiLCJpc0FkbWluIjp0cnVlfQ.3SAosAkfh49GtFA1t30-7ImmoIKzAgbtxYsthn-R8wM',
      },
    };

    await axios.delete(`/api/entries/${id}`, config);

    dispatch({
      type: CATALOG_DELETE_SUCCESS,
    });
    dispatch({
      type: CATALOG_LIST_REMOVE_ITEM,
      payload: id,
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

export const createCatalog =
  (entryNumber, title, author, date, comments) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CATALOG_CREATE_REQUEST });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmlja3kiLCJpc0FkbWluIjp0cnVlfQ.3SAosAkfh49GtFA1t30-7ImmoIKzAgbtxYsthn-R8wM',
        },
      };

      if (date === '') {
        date = new Date();
      }

      const { data } = await axios.post(
        `/api/entries/`,
        {
          entryNumber,
          title,
          author,
          date,
          comments,
        },
        config
      );

      dispatch({
        type: CATALOG_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATALOG_CREATE_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message,
      });
    }
  };

export const updateCatalog =
  (_id, entryNumber, title, author, date, comments) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CATALOG_UPDATE_REQUEST });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      // const config = {
      //   'Content-Type': 'application/json',
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };

      const config = {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmlja3kiLCJpc0FkbWluIjp0cnVlfQ.3SAosAkfh49GtFA1t30-7ImmoIKzAgbtxYsthn-R8wM',
        },
      };

      const { data } = await axios.put(
        `/api/entries/${_id}`,
        {
          entryNumber,
          title,
          author,
          date,
          comments,
        },
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
