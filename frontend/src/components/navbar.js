import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BSNav } from "react-bootstrap";

class Navbar extends React.Component {
  render() {
    return (
      <BSNav bg="dark" variant="dark">
        <BSNav.Brand href="/projects">Projects</BSNav.Brand>
        <Link to="/login">Login</Link>
      </BSNav>
    );
  }
}

export default Navbar;
