// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// import Product from '../components/Product';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCatalog, listCatalogs } from '../actions/catalogActions';

import Paginate from '../components/Paginate';

import CatalogTable from '../components/CatalogTable';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchForm from '../components/SearchForm';

import Flatpickr from 'react-flatpickr';
import { CATALOG_UPDATE_RESET } from '../constants/catalogConstants';

const HomeScreen = ({ history }) => {
  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const catalogList = useSelector((state) => state.catalogList);
  const { loading, error, catalogs, page, pages, total } = catalogList;

  const catalogDelete = useSelector((state) => state.catalogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = catalogDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch({ type: CATALOG_UPDATE_RESET });
      dispatch(
        listCatalogs(
          pageNumber,
          pageSize,
          sortBy,
          order,
          entryNumber,
          author,
          title,
          comments,
          date
        )
      );
    } else {
      history.push('/login');
    }
  }, [
    dispatch,
    pageNumber,
    pageSize,
    entryNumber,
    author,
    title,
    comments,
    date,
    sortBy,
    order,
    history,
    userInfo,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      listCatalogs(
        pageNumber,
        pageSize,
        sortBy,
        order,
        entryNumber,
        author,
        title,
        comments,
        date
      )
    );
  };

  const changePage = (e, pageNumber) => {
    e.preventDefault();
    setPageNumber(pageNumber);
  };

  const fp = useRef(null);

  return (
    <>
      <SearchForm
        submitHandler={submitHandler}
        entryNumber={entryNumber}
        title={title}
        author={author}
        date={date}
        comments={comments}
        sortBy={sortBy}
        order={order}
        pageSize={pageSize}
        setEntryNumber={setEntryNumber}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setDate={setDate}
        setComments={setComments}
        setSortBy={setSortBy}
        setOrder={setOrder}
        setPageSize={setPageSize}
      />

      {successDelete && <Message>Entry Deleted</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <>
          <CatalogTable catalogs={catalogs} />

          <Paginate
            pages={pages}
            page={page}
            setPageNumber={setPageNumber}
            className="mb-3"
          />

          <small>{`${total} results found`}</small>
        </>
      )}
    </>
  );
};

export default HomeScreen;
