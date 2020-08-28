import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as taskActions from "../actions/taskActions";
import { Redirect } from "react-router-dom";
import * as projectActions from "../actions/projectActions";

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

  componentDidMount() {
    this.props.setProjects();
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
    if (!this.props.projects) {
      return <div>Loading...</div>;
    }
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
                as="select"
                onChange={(e) => this.handleProjectChange(e.target.value)}
              >
                <option disabled hidden selected>
                  Select a Project
                </option>
                {this.props.projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add Task</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.project.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTask: (body) => {
      dispatch(taskActions.AddTask(body));
    },
    setProjects: () => {
      dispatch(projectActions.showProjects());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
