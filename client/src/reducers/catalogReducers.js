import {
  CATALOG_LIST_REQUEST,
  CATALOG_LIST_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_DETAILS_REQUEST,
  CATALOG_DETAILS_SUCCESS,
  CATALOG_DETAILS_FAIL,
  CATALOG_DELETE_REQUEST,
  CATALOG_DELETE_SUCCESS,
  CATALOG_DELETE_FAIL,
  CATALOG_CREATE_FAIL,
  CATALOG_CREATE_SUCCESS,
  CATALOG_CREATE_REQUEST,
  CATALOG_CREATE_RESET,
  CATALOG_UPDATE_RESET,
  CATALOG_UPDATE_FAIL,
  CATALOG_UPDATE_SUCCESS,
  CATALOG_UPDATE_REQUEST,
  CATALOG_CREATE_REVIEW_RESET,
  CATALOG_CREATE_REVIEW_FAIL,
  CATALOG_CREATE_REVIEW_SUCCESS,
  CATALOG_CREATE_REVIEW_REQUEST,
  CATALOG_TOP_FAIL,
  CATALOG_TOP_SUCCESS,
  CATALOG_TOP_REQUEST,
} from '../constants/catalogConstants';

export const catalogListReducer = (state = { catalogs: [] }, action) => {
  switch (action.type) {
    case CATALOG_LIST_REQUEST:
      return { loading: true, catalogList: [] };
    case CATALOG_LIST_SUCCESS:
      return {
        loading: false,
        catalogs: action.payload.entries,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
        pages: action.payload.pages,
      };
    case CATALOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const catalogDetailsReducer = (
  state = { loading: false, catalog: {} },
  action
) => {
  switch (action.type) {
    case CATALOG_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CATALOG_DETAILS_SUCCESS:
      return {
        loading: false,
        catalog: action.payload,
      };
    case CATALOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATALOG_DELETE_REQUEST:
      return { loading: true };
    case CATALOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATALOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const catalogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATALOG_CREATE_REQUEST:
      return { loading: true };
    case CATALOG_CREATE_SUCCESS:
      return { loading: false, success: true, catalog: action.payload };
    case CATALOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATALOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CATALOG_UPDATE_REQUEST:
      return { loading: true };
    case CATALOG_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CATALOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATALOG_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATALOG_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case CATALOG_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CATALOG_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CATALOG_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CATALOG_TOP_REQUEST:
      return { loading: true, products: [] };
    case CATALOG_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case CATALOG_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
