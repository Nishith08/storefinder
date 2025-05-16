import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/joy-e-logo.png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
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
            <Nav.Link as={Link} to="/home" active={location.pathname === '/home'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/products" active={location.pathname === '/products'}>Our Products</Nav.Link>
            <Nav.Link as={Link} to="/franchise" active={location.pathname === '/franchise'}>Franchise</Nav.Link>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Store Locator</Nav.Link>
            <Nav.Link as={Link} to="/blog" active={location.pathname === '/blog'}>Blog</Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'}>Contact Us</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;