import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductComponent from "../compont/Product";
import { API_URL } from "../utils/constant";
import axios from "axios";

export default class Menu extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios
      .get(`${API_URL}products`)
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
                    <ProductComponent key={menu.id} menu={menu} />
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
