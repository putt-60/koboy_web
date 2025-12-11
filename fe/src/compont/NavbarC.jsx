import React, { useState, useEffect } from "react";
import Modal from "../compont/Modal.jsx";
import "../style/NavbarC.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Phone, Mail, User } from "react-feather";

function NavbarC() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Cek status login di localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

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

              {/* Contact button */}
              <li>
                <button
                  onClick={() => setModalOpen(true)}
                  className="nav-contact-btn"
                >
                  Contact
                </button>
              </li>

              {/* Keranjang */}
              <li>
                <Link to="/keranjang">
                  <ShoppingCart className="cart-icon" />
                </Link>
              </li>

              {/* Jika login → tampil icon profile */}
              <li className="logintampil">
                {isLoggedIn ? (
                  <User
                    className="profile-icon"
                    style={{
                      cursor: "pointer",
                      width: "26px",
                      height: "26px",
                      color: "gray",
                    }}
                    onClick={() => navigate("/profile")}
                  />
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Popup kontak */}
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

      {/* Banner */}
      <section id="intro" className="intro-section">
        <img
          src="/assets/makanan/Logo After Edited.png"
          alt="Banner"
          className="banner-img"
        />
      </section>
    </>
  );
}

export default NavbarC;
