import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

class Controls extends React.Component {
  render() {
    return (
      <Navbar bg="light">
        {JSON.parse(localStorage.getItem("user")).role === "admin" ? (
          <Link to="/addUser" className="nav-link">
            Add User
          </Link>
        ) : (
          ""
        )}

        {JSON.parse(localStorage.getItem("user")).role === "admin" ? (
          <Link to="/addProject" className="nav-link">
            Add Project
          </Link>
        ) : (
          ""
        )}

        {JSON.parse(localStorage.getItem("user")).role === "admin" ||
        JSON.parse(localStorage.getItem("user")).role === "project manager" ? (
          <Link to="/addUserToProject" className="nav-link">
            Add User To Project
          </Link>
        ) : (
          ""
        )}

        <Link to="/addTask" className="nav-link">
          Add Task
        </Link>
      </Navbar>
    );
  }
}

export default Controls;
