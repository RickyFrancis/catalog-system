import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { format } from 'date-fns';
// import SearchBox from './SearchBox';
// import { logout } from '../actions/userActions';

const CatalogTable = ({ catalogs }) => {
  const dispatch = useDispatch();

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  const logoutHandler = () => {
    // dispatch(logout());
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
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {catalogs.map((catalog) => (
            <tr key={catalog.id}>
              <td>{catalog.id}</td>
              <td>{catalog.title}</td>
              <td>{catalog.completed.toString()}</td>
              <td>{format(new Date(), 'PP')}</td>
              <td>{catalog.title}</td>

              <td>
                <LinkContainer to={`/admin/product/${catalog.id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  //   onClick={() => deleteHandler(catalog.id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
    </>
  );
};

export default CatalogTable;
