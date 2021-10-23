import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { format } from 'date-fns';
import { deleteCatalog } from '../actions/catalogActions';
import Message from './Message';

const CatalogTable = ({ catalogs }) => {
  const dispatch = useDispatch();

  const catalogDelete = useSelector((state) => state.catalogDelete);
  const { loading: loadingDelete, error: errorDelete } = catalogDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCatalog(id));
    }
  };

  return (
    <>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Source</th>
            <th>Author</th>
            <th>Date</th>
            <th>Comments</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalogs?.length > 0 ? (
            catalogs.map((catalog) => (
              <tr key={catalog._id}>
                <td>{catalog.entryNumber}</td>
                <td>{catalog.title}</td>
                <td>{catalog.subtitle}</td>
                <td>{catalog.source}</td>
                <td>{catalog.author}</td>
                <td>{format(new Date(catalog.date), 'PP')}</td>
                <td>
                  {catalog.comments.length > 79 ? (
                    `${catalog.comments.substring(0, 80)}...`
                  ) : catalog.comments.length > 0 ? (
                    catalog.comments
                  ) : (
                    <i>No Comments</i>
                  )}
                </td>

                <td style={{ whiteSpace: 'nowrap' }} className="text-center">
                  <LinkContainer to={`/view-catalog/${catalog._id}`}>
                    <Button variant="primary" className="btn-sm">
                      <i className="fas fa-eye"></i>
                    </Button>
                  </LinkContainer>
                  &nbsp;
                  <LinkContainer to={`/edit-catalog/${catalog._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  &nbsp;
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(catalog._id)}
                  >
                    {loadingDelete ? (
                      <i className="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      <i className="fas fa-trash"></i>
                    )}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No entries yet. Please add some entries.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default CatalogTable;
