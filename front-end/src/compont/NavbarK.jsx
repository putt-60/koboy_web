import React, { useState } from "react";
import "../style/NavbarK.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "react-feather";

function NavbarK() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container className="navbar-content">
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="brand-text"
          style={{ cursor: "pointer" }}
        >
          Keranjang
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="burger-toggle" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="navbar-nav">
            <li>
              <Link to="/"><Home /></Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarK;
