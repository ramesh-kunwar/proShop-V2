import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch products
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products`);
      setProducts(data);
    };

    fetchProducts();
  }, []);
  console.log(products);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
