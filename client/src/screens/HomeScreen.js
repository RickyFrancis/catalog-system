// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Product from '../components/Product';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { listCatalogs } from '../actions/catalogActions';

import Paginate from '../components/Paginate';
// import ProductCarousel from '../components/ProductCarousel';
// import Meta from '../components/Meta';
import CatalogTable from '../components/CatalogTable';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import FormImpl from 'react-bootstrap/esm/Form';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageSize = 10;

  // const pages = 20;

  const pageNumber = match.params.pageNumber || 1;

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  const dispatch = useDispatch();

  const catalogList = useSelector((state) => state.catalogList);
  const { loading, error, catalogs, page, pages } = catalogList;

  useEffect(() => {
    dispatch(listCatalogs(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {/* <Meta /> */}
      {/* {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )} */}

      <Row>
        <Col md={4}>
          <h1>Master Catalog</h1>
        </Col>
        <Col md={{ span: 2, offset: 6 }} className="text-right">
          <LinkContainer to={`/documents/`}>
            <Button className="my-3">
              <i className="fas fa-plus"></i> &nbsp; New Document
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <CatalogTable catalogs={catalogs} />
          <Paginate pages={20} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
