import React, { useState, useRef, useEffect } from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';

import { listCatalogDetails, updateCatalog } from '../actions/catalogActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { CATALOG_UPDATE_RESET } from '../constants/catalogConstants';

const EditCatalogScreen = ({ match, history }) => {
  const catalogId = match.params.id;

  const dispatch = useDispatch();

  const catalogDetails = useSelector((state) => state.catalogDetails);
  const { loading, error, catalog } = catalogDetails;

  const catalogUpdate = useSelector((state) => state.catalogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    catalog: updatedCatalog,
    success: successUpdate,
  } = catalogUpdate;

  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (successUpdate) {
      setTimeout(() => {
        history.push(`/`);
      }, 2000);
    } else {
      if (!catalog || !catalog.title || catalog._id !== match.params.id) {
        dispatch(listCatalogDetails(match.params.id));
      } else {
        setEntryNumber(catalog.entryNumber);
        setTitle(catalog.title);
        setAuthor(catalog.author);
        setDate(catalog.date);
        setComments(catalog.comments);
      }
    }
  }, [dispatch, catalog, match, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCatalog(catalog._id, entryNumber, title, author, date, comments)
    );
  };

  // useEffect(() => {
  //   dispatch({ type: CATALOG_UPDATE_RESET });
  // }, []);

  const fp = useRef(null);

  return (
    <>
      <Form onSubmit={submitHandler} className="mb-3">
        <Form.Group controlId="entryNumber" className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter entry number"
            value={entryNumber}
            onChange={(e) => setEntryNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="author" className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
        </Form.Group>
        <div className="input-group mb-3">
          <Flatpickr
            className="form-control"
            style={{ background: '#FFF' }}
            options={{ dateFormat: 'm-d-Y' }}
            value={date}
            onChange={(date) => setDate(new Date(date))}
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
        <Form.Group controlId="comments" className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            rows={Math.ceil(comments.length / 166)}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <LinkContainer to={`/`} style={{ marginRight: '10px' }}>
          <Button variant="secondary">Back</Button>
        </LinkContainer>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      {successUpdate && <Message>Entry updated</Message>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loadingUpdate && <Loader />}
    </>
  );
};

export default EditCatalogScreen;
