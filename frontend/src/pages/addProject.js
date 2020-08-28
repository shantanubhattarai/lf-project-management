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

  componentDidMount() {
    this.props.getProjectManagers();
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
            <Form.Group>
              <Form.Label>Project Manager</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  this.handleProjectManagerChange(e.target.value)
                }
              >
                <option disabled hidden selected>
                  Select a Project Manager
                </option>
                {this.props.projectManagers.map((projectManager) => (
                  <option key={[projectManager].id} value={projectManager.id}>
                    {projectManager.first_name} {projectManager.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add Project</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projectManagers: state.project.projectManagers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (body) => {
      dispatch(projectActions.addProject(body));
    },
    getProjectManagers: () => {
      dispatch(projectActions.getProjectManagers());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
