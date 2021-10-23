import React, { useRef } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import Flatpickr from 'react-flatpickr';

const SearchForm = ({
  entryNumber,
  title,
  subtitle,
  source,
  author,
  date,
  comments,
  sortBy,
  order,
  pageSize,
  setEntryNumber,
  setTitle,
  setSubtitle,
  setSource,
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
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="number" visuallyHidden>
            Number
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="number"
            type="number"
            placeholder="Number"
            value={entryNumber}
            onChange={(e) => setEntryNumber(e.target.value)}
          />
        </Col>
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="title" visuallyHidden>
            Title
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="title"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="subtitle" visuallyHidden>
            Subtitle
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="subtitle"
            placeholder="Subtitle"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </Col>
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="source" visuallyHidden>
            Source
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="source"
            placeholder="Source"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Col>
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="author" visuallyHidden>
            Author
          </Form.Label>
          <Form.Control
            className="mb-2 inputNegativeMargin1"
            id="author"
            placeholder="Author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Col>
        <Col xs="12" sm="6" md="3" className="pl-2 pr-2 mt-2">
          <Form.Label htmlFor="date" visuallyHidden>
            Date
          </Form.Label>
          <div className="input-group mb-3 inputNegativeMargin2">
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
        <Col xs="12" sm="6" md="3">
          <Form.Label htmlFor="comments" visuallyHidden>
            Comments
          </Form.Label>
          <Form.Control
            className="mb-2 inputNegativeMargin2"
            id="comments"
            placeholder="Comments"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="auto" sm="6" md="auto">
          <Form.Label htmlFor="sort by" visuallyHidden>
            Sort by
          </Form.Label>
          <Form.Select
            size="sm"
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
        <Col xs="auto" sm="6" md="auto">
          <Form.Select
            size="sm"
            aria-label="Sort by"
            className="mb-2"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option>Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Col>
        <Col xs="auto" sm="6" md="1">
          <Form.Label htmlFor="page size" visuallyHidden>
            Show:
          </Form.Label>
          <Form.Select
            size="sm"
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
        <Col xs="auto" sm="6" md="1">
          <Button type="submit" className="mb-2" size="sm">
            <i className="fas fa-search"></i>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
