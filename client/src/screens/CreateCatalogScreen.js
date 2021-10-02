import React, { useState, useRef } from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap';

import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { LinkContainer } from 'react-router-bootstrap';

const CreateCatalogScreen = () => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   updateProduct({
    //     _id: productId,
    //     name,
    //     price,
    //     brand,
    //     category,
    //     countInStock,
    //     description,
    //     image,
    //   })
    // );
  };

  const options = {
    altInput: true,
    dateFormat: 'YYYY-MM-DD',
    // altFormat: 'DD-MM-YYYY',
    // allowInput: true,
    // parseDate: (datestr, format) => {
    //   return moment(datestr, format, true).toDate();
    // },
    // formatDate: (date, format, locale) => {
    //   // locale can also be used
    //   return moment(date).format(format);
    // },
  };
  const fp = useRef(null);
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="number" className="mb-3">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
  );
};

export default CreateCatalogScreen;
