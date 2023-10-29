import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import { useGetProductsQuery } from "../../slices/productApiSlice";
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2> Loading...</h2>
      ) : error ? (
        <h3>{error.data}</h3>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
