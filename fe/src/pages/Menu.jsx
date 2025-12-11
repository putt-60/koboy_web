import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductComponent from "../compont/Product";
import axios from "axios";

// Endpoint JSON Server
const getProducts = "http://localhost:3000/products";

export default class Menu extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios
      .get(getProducts)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <Container fluid className="p-0">
        <div className="duct">
          <Row className="m-0 p-4">
            <Col>
              <h1>
                <strong>Menu</strong>
              </h1>
              <hr />
              <Row>
                {products.length > 0 ? (
                  products.map((menu) => (
                    <ProductComponent
                      key={menu.id}
                      menu={{
                        ...menu,
                        imageUrl: `/makanan/${menu.gambar}`,
                      }}
                    />
                  ))
                ) : (
                  <p>Loading menu...</p>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

// api untuk post pesanan:
// api data products: http://localhost:3000/get/products
