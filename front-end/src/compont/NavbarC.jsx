import React, { useState } from "react";
import Modal from "../compont/Modal.jsx";
import "../style/NavbarC.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Phone, Mail } from "react-feather";

function NavbarC({ onAboutClick }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container className="navbar-content">
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="brand-text"
            style={{ cursor: "pointer" }}
          >
            Ko-Boy Fried Chicken
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="burger-toggle"
          />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navbar-nav">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/menu">Menu</Link>
              </li>

              <li>
                <Link to="/history">History</Link>
              </li>

              <li>
                <a href="#" onClick={() => setModalOpen(true)}>
                  Contact
                </a>
              </li>

              <li>
                <a href="#">
                <Link to="/Keranjang "><ShoppingCart /></Link>
                </a>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* modal (contact popup) */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="popup-h2">Contact Us</h2>
          <div className="contact-links">
            <a
              href="https://wa.me/+6285282359717"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone /> +62-8528-2359-717
            </a>
            <a href="mailto:koboyfriedchicken@gmail.com">
              <Mail /> KoboyFriedChicken@gmail.com
            </a>
          </div>
        </Modal>
      )}

      {/* bg */}
      <section id="intro" className="intro-section">
        <img src="/assets/makanan/Logo After Edited.png" alt="Banner" className="banner-img" />
      </section>
    </>
  );
}

export default NavbarC;
