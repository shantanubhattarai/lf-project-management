import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  setUsername(usernameValue) {
    this.setState({ username: usernameValue });
  }

  setPassword(passwordValue) {
    this.setState({ password: passwordValue });
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.redirect) return <Redirect to="/projects" />;
    return (
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <Form onSubmit={this.handleLogin}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    redirect: state.auth.redirect,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(authActions.Login(username, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
