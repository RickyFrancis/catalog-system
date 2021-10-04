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
  Pagination,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCatalog, listCatalogs } from '../actions/catalogActions';

import Paginate from '../components/Paginate';

import CatalogTable from '../components/CatalogTable';
import Loader from '../components/Loader';
import Message from '../components/Message';

import Flatpickr from 'react-flatpickr';

const HomeScreen = ({ match }) => {
  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [pageSize, setPageSize] = useState('');

  const dispatch = useDispatch();

  const catalogList = useSelector((state) => state.catalogList);
  const { loading, error, catalogs, page, pages } = catalogList;

  const catalogDelete = useSelector((state) => state.catalogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = catalogDelete;

  useEffect(() => {
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
      <Form className="mb-3" onSubmit={submitHandler}>
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
          <Col xs="auto">
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
          <Col xs="auto">
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
          <Col xs="auto" className="p-1 mt-2">
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
              <button
                className="btn btn-outline-danger"
                type="button"
                id="button-addon2"
                onClick={() => {
                  if (!fp?.current?.flatpickr) return;
                  fp.current.flatpickr.clear();
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </Col>
          <Col xs="auto">
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
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Sort by
            </Form.Label>
            <Form.Select
              aria-label="Sort by"
              className="mb-2"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Sort by</option>
              <option value="number">Number</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="date">Date</option>
              <option value="comment">Comment</option>
            </Form.Select>
          </Col>

          <Col xs="auto">
            <Form.Select
              aria-label="Sort by"
              className="mb-2"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option>Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select
              aria-label="Sort by"
              className="mb-2"
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option>Page Size</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="10">25</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {successDelete && <Message>Entry Deleted</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <>
          <CatalogTable catalogs={catalogs} />
          {pages > 1 && (
            <Pagination>
              {[...Array(pages).keys()].map((x) => (
                <Pagination.Item
                  active={x + 1 === page}
                  onClick={(e) => setPageNumber(x + 1)}
                >
                  {x + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
          {/* <Paginate pages={pages} page={page} changePage={changePage} /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
