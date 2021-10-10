import React, { useRef } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Flatpickr from 'react-flatpickr';

const SearchForm = ({
  entryNumber,
  title,
  author,
  date,
  comments,
  sortBy,
  order,
  pageSize,
  setEntryNumber,
  setTitle,
  setAuthor,
  setDate,
  setComments,
  setSortBy,
  setOrder,
  setPageSize,
  submitHandler,
}) => {
  const fp = useRef(null);
  return (
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
            <option value="entryNumber">Entry Number</option>
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
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Show:
          </Form.Label>
          <Form.Select
            aria-label="Sort by"
            className="mb-2"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
