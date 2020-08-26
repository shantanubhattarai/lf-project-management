import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as projectActions from "../actions/projectActions";

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      project_manager: "",
    };
  }

  handleNameChange = (value) => {
    this.setState({ name: value });
  };
  handleDescriptionChange = (value) => {
    this.setState({ description: value });
  };
  handleProjectManagerChange = (value) => {
    this.setState({ project_manager: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addProject(this.state);
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">Add Project</div>
        <div className="card-body">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={this.state.name}
                onChange={(e) => this.handleNameChange(e.target.value)}
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
              <Form.Label>Project Manager</Form.Label>
              <Form.Control
                type="text"
                required
                value={this.state.project_manager}
                onChange={(e) =>
                  this.handleProjectManagerChange(e.target.value)
                }
              />
            </Form.Group>
            <Button type="submit">Add Project</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (body) => {
      dispatch(projectActions.addProject(body));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddProject);
