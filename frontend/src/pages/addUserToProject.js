import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as projectActions from "../actions/projectActions";

class AddUserToProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      userId: "",
    };
  }

  componentDidMount() {
    this.props.setProjects();
    this.props.getUsers();
  }

  handleUserChange = (value) => {
    console.log(value);
    this.setState({ userId: value });
  };
  handleProjectChange = (value) => {
    this.setState({ projectId: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUserToProject(this.state.projectId, this.state.userId);
  };

  render() {
    if (!this.props.projects || !this.props.users) {
      return <div>Loading...</div>;
    }
    return (
      <div className="card">
        <div className="card-header">Add User to Project</div>
        <div className="card-body">
          {this.props.message !== "" ? <div>{this.props.message}</div> : ""}
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleUserChange(e.target.value)}
              >
                <option key="default" selected disabled hidden>
                  Select an user
                </option>
                {this.props.users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Project</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.handleProjectChange(e.target.value)}
              >
                <option key="default" selected disabled hidden>
                  Select a project
                </option>
                {Object.values(this.props.projects).map((project) => (
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
    users: state.project.users,
    message: state.project.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUserToProject: (projectId, userId) => {
      dispatch(projectActions.assignUser(projectId, userId));
    },
    setProjects: () => {
      dispatch(projectActions.showProjects());
    },
    getUsers: () => {
      dispatch(projectActions.getUsers());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToProject);
