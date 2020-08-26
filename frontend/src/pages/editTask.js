import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import * as taskActions from "../actions/taskActions";

class EditTask extends React.Component {
  componentDidMount() {
    this.props.setCurrentTask(this.props.match.params.id);
  }

  handleTitleChange(value) {
    this.props.setTitle(value);
  }

  handleDescChange(value) {
    this.props.setDescription(value);
  }

  handleAssignedUserChange(value) {
    this.props.setAssignedUser(value);
  }

  handleProjectChange(value) {
    this.props.setProject(value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.updateTask(
      this.props.task.id,
      this.props.task.title,
      this.props.task.description,
      this.props.task.assigned_user,
      this.props.task.project
    );
  }

  render() {
    if (!this.props.task.id) return <div>Loading..</div>;
    return (
      <div>
        <Form onSubmit={(e) => this.handleFormSubmit(e)}>
          <Form.Group>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              onChange={(e) => this.handleTitleChange(e.target.value)}
              value={this.props.task.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              onChange={(e) => this.handleDescChange(e.target.value)}
              value={this.props.task.description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Assigned User</Form.Label>
            <Form.Control
              onChange={(e) => this.handleAssignedUserChange(e.target.value)}
              value={this.props.task.assigned_user}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <Form.Control
              onChange={(e) => this.handleProjectChange(e.target.value)}
              value={this.props.task.project}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    task: state.task.currentEditTaskDetails,
    assignedUser: state.task.assignedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentTask: (taskId) => {
      dispatch(taskActions.showTask(taskId));
    },
    setTitle: (value) => {
      dispatch(taskActions.setTitle(value));
    },
    setDescription: (value) => {
      dispatch(taskActions.setDescription(value));
    },
    setAssignedUser: (value) => {
      dispatch(taskActions.setAssignedUser(value));
    },
    setProject: (value) => {
      dispatch(taskActions.setProject(value));
    },
    updateTask: (id, title, description, assignedUser, project) => {
      dispatch(
        taskActions.updateTask(id, title, description, assignedUser, project)
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
