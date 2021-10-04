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
            <tr key={catalog._id}>
              <td>{catalog.entryNumber}</td>
              <td>{catalog.title}</td>
              <td>{catalog.author}</td>
              <td>{format(new Date(catalog.date), 'PP')}</td>
              <td>{`${catalog.comments.substring(0, 80)}...`}</td>

              <td>
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
