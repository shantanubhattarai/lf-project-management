import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";
import { Redirect } from "react-router-dom";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      role: "",
    };
  }

  componentDidMount() {
    this.props.getRoles();
  }

  handleFirstNameChange = (value) => {
    this.setState({ firstname: value });
  };
  handleLastNameChange = (value) => {
    this.setState({ lastname: value });
  };
  handleEmailChange = (value) => {
    this.setState({ email: value });
  };
  handlePasswordChange = (value) => {
    this.setState({ password: value });
  };
  handleUsernameChange = (value) => {
    this.setState({ username: value });
  };
  handleRoleChange = (value) => {
    this.setState({ role: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state);
  };

  render() {
    if (this.props.redirect && this.props.redirect !== "")
      return <Redirect to={this.props.redirect} />;
    return (
      <div className="card">
        <div className="card-header">Add User</div>
        <div className="card-body">
          {this.props.message !== "" ? <div>{this.props.message}</div> : ""}
          {this.props.error !== "" ? <div>{this.props.error}</div> : ""}
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                value={this.state.firstname}
                onChange={(e) => this.handleFirstNameChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                value={this.state.lastname}
                onChange={(e) => this.handleLastNameChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={this.state.email}
                onChange={(e) => this.handleEmailChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={this.state.password}
                onChange={(e) => this.handlePasswordChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                value={this.state.username}
                onChange={(e) => this.handleUsernameChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleRoleChange(e.target.value)}
              >
                <option disabled hidden selected>
                  Select a Role
                </option>
                {this.props.roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add User</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.auth.roles,
    message: state.auth.message,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (body) => {
      dispatch(authActions.AddUser(body));
    },
    getRoles: () => {
      dispatch(authActions.getRoles());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
