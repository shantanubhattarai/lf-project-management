import React from "react";
import * as projectActions from "../actions/projectActions";
import * as taskActions from "../actions/taskActions";
import { connect } from "react-redux";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Task from "../components/task";
import { Link } from "react-router-dom";

class Project extends React.Component {
  componentDidMount() {
    this.props.setCurrentProject(this.props.match.params.id);
    this.props.setTasks(this.props.match.params.id);
  }

  handleDelete = (e, body) => {
    e.preventDefault();
    this.props.removeTask(body);
  };

  render() {
    return (
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">{this.props.project.name}</div>
          <div className="card-body">{this.props.project.description}</div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">Tasks</div>

              <ListGroup variant="flush">
                {Object.values(this.props.tasks).map((task) => (
                  <ListGroupItem
                    key={task.id}
                    action
                    onClick={(e) => this.props.setCurrentTask(task.id)}
                  >
                    {task.title}
                    {JSON.parse(localStorage.getItem("user")).id ===
                      task.assigned_user ||
                    JSON.parse(localStorage.getItem("user")).role !==
                      "engineer" ? (
                      <Link to={`/editTask/${task.id}`}>Edit</Link>
                    ) : (
                      ""
                    )}
                    {JSON.parse(localStorage.getItem("user")).role !==
                    "engineer" ? (
                      <a
                        href="#"
                        className="float-right btn btn-danger"
                        onClick={(e) =>
                          this.handleDelete(e, {
                            taskId: task.id,
                            projectId: this.props.project.id,
                          })
                        }
                      >
                        Delete
                      </a>
                    ) : (
                      ""
                    )}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <Task />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project.currentProject,
    tasks: state.project.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentProject: (projectId) => {
      dispatch(projectActions.showProjectDetails(projectId));
    },
    setTasks: (projectId) => {
      dispatch(projectActions.showProjectTasks(projectId));
    },
    setCurrentTask: (taskId) => {
      dispatch(taskActions.showTask(taskId));
    },
    removeTask: (body) => {
      dispatch(projectActions.removeTask(body));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
