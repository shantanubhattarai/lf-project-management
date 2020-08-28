import React from "react";
import { connect } from "react-redux";
import * as projectActions from "../actions/projectActions";
import { Link, Redirect } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Controls from "./controls";
import { Button } from "react-bootstrap";

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.setProjects();
  }

  handleDelete(e, body) {
    e.preventDefault();
    this.props.deleteProject(body);
  }

  render() {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("authToken") === ""
    ) {
      return <Redirect to="/login" />;
    }

    if (this.props.projects.message) {
      return <div className="text-center">{this.props.projects.message}</div>;
    }
    return (
      <div>
        {JSON.parse(localStorage.getItem("user")).id ? <Controls /> : ""}
        <ListGroup>
          {Object.values(this.props.projects).map((project) => (
            <ListGroupItem key={project.id}>
              <Link to={`/project/${project.id}`}> {project.name}</Link>
              {JSON.parse(localStorage.getItem("user")).role === "admin" ? (
                <Button
                  className="float-right"
                  variant="danger"
                  onClick={(e) =>
                    this.handleDelete(e, { projectId: project.id })
                  }
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
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
    setProjects: () => {
      dispatch(projectActions.showProjects());
    },
    deleteProject: (body) => {
      dispatch(projectActions.deleteProject(body));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
