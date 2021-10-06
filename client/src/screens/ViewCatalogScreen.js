import React, { useState, useRef, useEffect } from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';

import { listCatalogDetails } from '../actions/catalogActions';
import { useDispatch, useSelector } from 'react-redux';

const ViewCatalogScreen = ({ match }) => {
  const catalogId = match.params.id;

  const dispatch = useDispatch();

  const catalogDetails = useSelector((state) => state.catalogDetails);
  const { loading, error, catalog } = catalogDetails;

  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (
      !catalog ||
      !catalog.title ||
      catalog._id.toString() !== match.params.id
    ) {
      dispatch(listCatalogDetails(match.params.id));
    } else {
      setEntryNumber(catalog.entryNumber);
      setTitle(catalog.title);
      setAuthor(catalog.author);
      setDate(new Date());
      setComments(catalog.comments);
    }
  }, [dispatch, catalog, match]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fp = useRef(null);

  return (
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
          style={{ background: '#FFF' }}
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
          //   onClick={() => {
          //     if (!fp?.current?.flatpickr) return;
          //     fp.current.flatpickr.open();
          //   }}
        >
          <i className="far fa-calendar-alt"></i>
        </button>
      </div>
      <Form.Group controlId="comments" className="mb-3">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={comments}
          readOnly
        ></Form.Control>
      </Form.Group>

      <LinkContainer to={`/`} style={{ marginRight: '10px' }}>
        <Button variant="secondary">Back</Button>
      </LinkContainer>
      <LinkContainer to={`/edit-catalog/${catalog._id}`}>
        <Button variant="primary">Edit</Button>
      </LinkContainer>
    </Form>
  );
};

export default ViewCatalogScreen;
