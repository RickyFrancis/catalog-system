import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { format } from 'date-fns';
import { deleteCatalog } from '../actions/catalogActions';
// import SearchBox from './SearchBox';
// import { logout } from '../actions/userActions';

const CatalogTable = ({ catalogs }) => {
  const dispatch = useDispatch();

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  const logoutHandler = () => {
    // dispatch(logout());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCatalog(id));
    }
  };

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Comments</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {catalogs.length > 0 ? (
            catalogs.map((catalog) => (
              <tr key={catalog._id}>
                <td>{catalog.entryNumber}</td>
                <td>{catalog.title}</td>
                <td>{catalog.author}</td>
                <td>{format(new Date(catalog.date), 'PP')}</td>
                {/* ${catalog.comments.substring(0, 80)} */}
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
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No entries yet. Please add some entries.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
    </>
  );
};

export default CatalogTable;
