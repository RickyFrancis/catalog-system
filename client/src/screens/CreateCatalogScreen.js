import React, { useState, useRef, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';
import { createCatalog } from '../actions/catalogActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CreateCatalogScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [entryNumber, setEntryNumber] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [source, setSource] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  const catalogCreate = useSelector((state) => state.catalogCreate);
  const { loading, error, success } = catalogCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCatalog(
        entryNumber,
        title,
        subtitle,
        source,
        author,
        date,
        comments
      )
    );
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push(`/`);
      }, 1000);
    }
  }, [success, history]);

  const fp = useRef(null);

  return (
    <>
      <Form onSubmit={submitHandler} className="mb-3">
        <Form.Group controlId="entryNumber" className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="number"
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
        <Form.Group controlId="subtitle" className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="source" className="mb-3">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
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
            class="form-control"
            style={{ background: '#FFF' }}
            options={{ dateFormat: 'm-d-Y' }}
            value={date}
            onChange={(date) => setDate(new Date(date))}
            ref={fp}
            placeholder="Select date"
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
            style={{ height: '100px' }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <LinkContainer to={`/`} style={{ marginRight: '10px' }}>
          <Button variant="secondary">Back</Button>
        </LinkContainer>
        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
      {success && <Message>Entry created</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
    </>
  );
};

export default CreateCatalogScreen;
