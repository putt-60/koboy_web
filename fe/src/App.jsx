import React, { Component, createRef } from "react";
import { Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import NavbarComponent from "./compont/NavbarC";
import FooterComponent from "./compont/FooterC";
import AboutComponent from "./compont/About";
import Menu from "./pages/Menu";
import Keranjang from "./pages/Keranjang";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { API_URL } from "./utils/constant";
import axios from "axios";

import "./App.css";

function DefaultLayout({ children, onAboutClick }) {
  return (
    <>
      <NavbarComponent onAboutClick={onAboutClick} />
      <Container fluid className="p-0">{children}</Container>
      <FooterComponent />
    </>
  );
}

function CartLayout({ children }) {
  return <Container fluid className="p-0">{children}</Container>;
}

function AuthLayout({ children }) {
  return <div>{children}</div>;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.aboutRef = createRef();
  }

  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then((res) => this.setState({ products: res.data }))
      .catch((error) => console.error("Error fetching products:", error));
  }

  scrollToAbout = () => {
    if (window.location.pathname === "/" && this.aboutRef.current) {
      this.aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  render() {
    return (
      <Routes>

        <Route
          path="/"
          element={
            <DefaultLayout onAboutClick={this.scrollToAbout}>
              <Row className="m-0" ref={this.aboutRef} id="about">
                <AboutComponent />
              </Row>
            </DefaultLayout>
          }
        />

        <Route
          path="/menu"
          element={
            <DefaultLayout>
              <Menu />
            </DefaultLayout>
          }
        />

        <Route
          path="/history"
          element={
            <DefaultLayout>
              <History />
            </DefaultLayout>
          }
        />

        <Route
          path="/keranjang"
          element={
            <CartLayout>
              <Keranjang />
            </CartLayout>
          }
        />


        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />


        <Route
          path="/profile"
          element={
            <AuthLayout>
              <Profile />
            </AuthLayout>
          }
        />
      </Routes>
    );
  }
}
