import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as taskActions from "../actions/taskActions";
import { Redirect } from "react-router-dom";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      assigned_user: "",
      project: "",
    };
  }

  handleTitleChange = (value) => {
    this.setState({ title: value });
  };
  handleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  handleAssignedUserChange = (value) => {
    this.setState({ assigned_user: value });
  };
  handleProjectChange = (value) => {
    this.setState({ project: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state);
  };

  render() {
    if (this.props.redirect && this.props.redirect !== "")
      return <Redirect to={this.props.redirect} />;
    return (
      <div className="card">
        <div className="card-header">Add Task</div>
        <div className="card-body">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                value={this.state.title}
                onChange={(e) => this.handleTitleChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                value={this.state.description}
                onChange={(e) => this.handleDescriptionChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Assigned User</Form.Label>
              <Form.Control
                required
                value={this.state.email}
                onChange={(e) => this.handleAssignedUserChange(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Control
                required
                value={this.state.password}
                onChange={(e) => this.handleProjectChange(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Add Task</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTask: (body) => {
      dispatch(taskActions.AddTask(body));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddTask);
