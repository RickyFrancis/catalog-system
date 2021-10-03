// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// import Product from '../components/Product';
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { listCatalogs } from '../actions/catalogActions';

import Paginate from '../components/Paginate';

import CatalogTable from '../components/CatalogTable';
import Loader from '../components/Loader';
import Message from '../components/Message';

import Flatpickr from 'react-flatpickr';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageSize = 10;
  const pageNumber = match.params.pageNumber || 1;

  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');

  const dispatch = useDispatch();

  const catalogList = useSelector((state) => state.catalogList);
  const { loading, error, catalogs, page, pages } = catalogList;

  useEffect(() => {
    dispatch(
      listCatalogs(
        pageNumber,
        sortBy,
        order,
        entryNumber,
        author,
        title,
        comments,
        date
      )
    );
  }, [
    dispatch,
    keyword,
    pageNumber,
    entryNumber,
    author,
    title,
    comments,
    date,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      listCatalogs(
        pageNumber,
        sortBy,
        order,
        entryNumber,
        author,
        title,
        comments,
        date
      )
    );
    // if (keyword.trim()) {
    //   history.push(`/search/${keyword}`);
    // } else {
    //   history.push('/');
    // }
  };

  const fp = useRef(null);

  return (
    <>
      <Form className="mb-2" onSubmit={submitHandler}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Number
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              type="number"
              placeholder="Number"
              value={entryNumber}
              onChange={(e) => setEntryNumber(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="p-1">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Title
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="p-1">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Author
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="p-1">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Date
            </Form.Label>
            <div className="input-group mb-3">
              <Flatpickr
                class="form-control"
                style={{ background: '#FFF' }}
                options={{ dateFormat: 'm-d-Y' }}
                value={date}
                onChange={(date) => setDate(date)}
                ref={fp}
                placeholder="Select Date"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  if (!fp?.current?.flatpickr) return;
                  fp.current.flatpickr.open();
                }}
              >
                <i className="far fa-calendar-alt"></i>
              </button>
            </div>
          </Col>
          <Col xs="auto" className="p-1">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Comment
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Comment"
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              <i className="fas fa-search"></i>
            </Button>
            &nbsp;
            <LinkContainer to={`/create-catalog/`}>
              <Button className="mb-2">
                <i className="fas fa-plus"></i>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <CatalogTable catalogs={catalogs} />
          <Paginate pages={20} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
