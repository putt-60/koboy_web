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
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const readAuth = () => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const avatarUrl = localStorage.getItem("userAvatar") || null;
    return { loginStatus, avatarUrl };
  };

  useEffect(() => {
    // initial read
    const { loginStatus, avatarUrl } = readAuth();
    setIsLoggedIn(loginStatus);
    setAvatar(avatarUrl);

    // handler untuk event storage (ter-trigger ketika localStorage diubah di TAB LAIN)
    const onStorage = (e) => {
      const { loginStatus, avatarUrl } = readAuth();
      setIsLoggedIn(loginStatus);
      setAvatar(avatarUrl);
    };

    // handler untuk event kustom login/logout (ter-trigger di TAB SAMA)
    const onLogin = () => {
      const { loginStatus, avatarUrl } = readAuth();
      setIsLoggedIn(loginStatus);
      setAvatar(avatarUrl);
    };
    const onLogout = () => {
      setIsLoggedIn(false);
      setAvatar(null);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("login", onLogin);
    window.addEventListener("logout", onLogout);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("login", onLogin);
      window.removeEventListener("logout", onLogout);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container className="navbar-content">
          <Navbar.Brand onClick={() => navigate("/")} className="brand-text" style={{ cursor: "pointer" }}>
            Ko-Boy Fried Chicken
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="burger-toggle" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/history">History</Link></li>

              <li>
                <button onClick={() => setModalOpen(true)} className="nav-contact-btn">Contact</button>
              </li>

              <li>
                <Link to="/keranjang"><ShoppingCart className="cart-icon" /></Link>
              </li>

              <li className="logintampil">
                {isLoggedIn ? (
                  // gunakan foto avatar jika ada, else icon User
                  avatar ? (
                    <img
                      src={avatar}
                      alt="profile"
                      onClick={() => navigate("/profile")}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                        border: "1px solid #e0e0e0"
                      }}
                    />
                  ) : (
                    <User
                      className="profile-icon"
                      style={{ cursor: "pointer", width: 26, height: 26, color: "gray" }}
                      onClick={() => navigate("/profile")}
                    />
                  )
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className="popup-h2">Contact Us</h2>
          <div className="contact-links">
            <a href="https://wa.me/+6285282359717" target="_blank" rel="noopener noreferrer"><Phone /> +62-8528-2359-717</a>
            <a href="mailto:koboyfriedchicken@gmail.com"><Mail /> KoboyFriedChicken@gmail.com</a>
          </div>
        </Modal>
      )}

      <section id="intro" className="intro-section">
        <img src="/assets/makanan/Logo After Edited.png" alt="Banner" className="banner-img" />
      </section>
    </>
  );
}

export default NavbarC;
