import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/joy-e-logo.png';

const Navbar = () => (
  <BSNavbar expand="lg" style={{ backgroundColor: '#e6e6e6' }}>
    <Container>
      <BSNavbar.Brand as={Link} to="/">
        <img
          src={logo}
          alt="JoyEbike Logo"
          height="40"
          style={{ verticalAlign: 'middle' }}
        />
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="navbarNav" />
      <BSNavbar.Collapse id="navbarNav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link as={Link} to="/products">Our Products</Nav.Link>
          <Nav.Link as={Link} to="/franchise">Franchise</Nav.Link>
          <Nav.Link as={Link} to="/store-locator">Store Locator</Nav.Link>
          <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        </Nav>
      </BSNavbar.Collapse>
    </Container>
  </BSNavbar>
);

export default Navbar;