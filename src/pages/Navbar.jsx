import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from '../assets/joy-e-logo.png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <BSNavbar expand="lg" sticky="top">
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
            <Nav.Link
              as="a"
              href="https://www.joyebike.com/home/"
              // target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as="a"
              href="https://www.joyebike.com/about-us/"
              // target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </Nav.Link>
             <NavDropdown
              title="Our Products"
              id="products-dropdown"
              active={location.pathname.startsWith('/products')}
            >
              <NavDropdown.Item
                as="a"
                href="https://joyebike.com/nemo/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Nemo
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://joyebike.com/mihos/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Mihos
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/wolfplus/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Wolf+
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/gen-next+"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Gen Next Nanu+
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/hurricane/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Hurricane
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/thunderbolt/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Thunderbolt
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/beast/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Beast
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/glob-bike/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Glob
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/wolf-bike/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Wolf
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://www.joyebike.com/product/gen-next-nanu-e-scooter/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Gen Next Nanu E-Scooter
              </NavDropdown.Item>
              <NavDropdown.Item
                as="a"
                href="https://joyebike.com/product/joyebikeEco/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Eco Model
              </NavDropdown.Item>
              {/* Add more product categories as needed */}
            </NavDropdown>
            <Nav.Link
              as="a"
              href="https://www.joyebike.com/franchise/"
              // target="_blank"
              rel="noopener noreferrer"
            >
              Franchise
            </Nav.Link>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Store Locator</Nav.Link>
            <Nav.Link
              as="a"
              href="https://www.joyebike.com/blog/"
              // target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as="a"
              href="https://www.joyebike.com/contact-us/"
              // target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;