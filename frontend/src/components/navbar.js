import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BSNav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";

class Navbar extends React.Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    return (
      <BSNav bg="light" variant="light">
        <BSNav.Brand href="/projects">Projects</BSNav.Brand>
        {JSON.parse(localStorage.getItem("user")) !== null ? (
          <Button onClick={(e) => this.handleLogout(e)}>Logout</Button>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </BSNav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(authActions.Logout);
    },
  };
}

export default connect(null, mapDispatchToProps)(Navbar);
