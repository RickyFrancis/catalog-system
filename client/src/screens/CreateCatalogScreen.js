import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const CreateCatalogScreen = () => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(new Date());
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

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="number">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="author">
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
        <Form.Control
          type="text"
          placeholder="Enter Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="comments">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary">
        Update
      </Button>
    </Form>
  );
};

export default CreateCatalogScreen;
