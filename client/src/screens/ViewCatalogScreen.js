import React, { useState, useRef, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';

import { deleteCatalog, listCatalogDetails } from '../actions/catalogActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ViewCatalogScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const catalogDetails = useSelector((state) => state.catalogDetails);
  const { loading, error, catalog } = catalogDetails;

  const catalogDelete = useSelector((state) => state.catalogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = catalogDelete;

  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [source, setSource] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (successDelete) {
      setTimeout(() => {
        history.push(`/`);
      }, 1000);
    } else {
      if (
        !catalog ||
        !catalog.title ||
        catalog._id.toString() !== match.params.id
      ) {
        dispatch(listCatalogDetails(match.params.id));
      } else {
        setEntryNumber(catalog.entryNumber);
        setTitle(catalog.title);
        setSubtitle(catalog.subtitle);
        setSource(catalog.source);
        setAuthor(catalog.author);
        setDate(new Date());
        setComments(catalog.comments);
      }
    }
  }, [dispatch, catalog, match, successDelete, history]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCatalog(id));
    }
  };

  const fp = useRef(null);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message>Entry deleted</Message>}
      {loading && <Loader />}
      {loadingDelete && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="entryNumber" className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter entry number"
            value={entryNumber}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="subtitle" className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="source" className="mb-3">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
        </Form.Group>
        <div className="input-group mb-3">
          <Flatpickr
            className="form-control"
            style={{ background: '#E9ECEF' }}
            options={{ dateFormat: 'm-d-Y' }}
            value={date}
            ref={fp}
            placeholder="Select Date"
            disabled
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            disabled
          >
            <i className="far fa-calendar-alt"></i>
          </button>
        </div>
        <Form.Group controlId="comments" className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={Math.ceil(comments.length / 166)}
            placeholder="Leave a comment here"
            value={comments}
            readOnly
          ></Form.Control>
        </Form.Group>
        <Button
          variant="danger"
          onClick={() => deleteHandler(catalog._id)}
          style={{ marginRight: '10px' }}
        >
          <i className="fas fa-trash"></i>
        </Button>

        <LinkContainer to={`/`} style={{ marginRight: '10px' }}>
          <Button variant="secondary">Back</Button>
        </LinkContainer>
        <LinkContainer to={`/edit-catalog/${catalog._id}`}>
          <Button variant="primary">Edit</Button>
        </LinkContainer>
      </Form>
    </>
  );
};

export default ViewCatalogScreen;
