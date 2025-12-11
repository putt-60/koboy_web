import React from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { numberWithCommas } from "../utils/utils.js";

function Menus({ menu }) {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow">
        <Card.Img
          variant="top"
          src={`assets/images/makanan/${menu.pictures}`}
        />
        <Card.Body>
          <Card.Title>
            {menu.name} <strong>({menu.id})</strong>
          </Card.Title>
          <Card.Text>Rp.{numberWithCommas(menu.price)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Menus;
