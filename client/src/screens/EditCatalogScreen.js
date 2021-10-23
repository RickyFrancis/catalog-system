import React, { useState, useRef, useEffect } from 'react';

import { Form, Button, OverlayTrigger, Popover } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';

import {
  deleteCatalog,
  listCatalogDetails,
  updateCatalog,
} from '../actions/catalogActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

const EditCatalogScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const catalogDetails = useSelector((state) => state.catalogDetails);
  const { loading, error, catalog } = catalogDetails;

  const catalogUpdate = useSelector((state) => state.catalogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = catalogUpdate;

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
    if (successUpdate || successDelete) {
      setTimeout(() => {
        history.push(`/`);
      }, 1000);
    } else {
      if (!catalog || !catalog.title || catalog._id !== match.params.id) {
        dispatch(listCatalogDetails(match.params.id));
      } else {
        setEntryNumber(catalog.entryNumber);
        setTitle(catalog.title);
        setSubtitle(catalog.subtitle);
        setSource(catalog.source);
        setAuthor(catalog.author);
        setDate(catalog.date);
        setComments(catalog.comments);
      }
    }
  }, [dispatch, catalog, match, successUpdate, history, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCatalog(
        catalog._id,
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

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCatalog(id));
    }
  };

  const fp = useRef(null);

  return (
    <>
      <Form onSubmit={submitHandler} className="mb-3">
        <Form.Group controlId="entryNumber" className="mb-3">
          <Form.Label>Number</Form.Label>{' '}
          <OverlayTrigger
            placement="bottom"
            size="sm"
            overlay={
              <Popover id="popover-contained">
                <Popover.Header as="h3">
                  Entry number can't be changed
                </Popover.Header>
                <Popover.Body>
                  Made a mistake in entry number? Please delete this catalog and
                  create a new one.
                </Popover.Body>
              </Popover>
            }
          >
            <Form.Control
              type="text"
              placeholder="Enter entry number"
              value={entryNumber}
              onChange={(e) => setEntryNumber(e.target.value)}
              readOnly
            ></Form.Control>
          </OverlayTrigger>
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
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
      {successUpdate && <Message>Entry updated</Message>}
      {successDelete && <Message>Entry deleted</Message>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading && <Loader />}
      {loadingUpdate && <Loader />}
      {loadingDelete && <Loader />}
    </>
  );
};

export default EditCatalogScreen;
