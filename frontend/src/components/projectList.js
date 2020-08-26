import React from "react";
import { connect } from "react-redux";
import * as projectActions from "../actions/projectActions";
import { Link, Redirect } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.setProjects();
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
        <ListGroup>
          {Object.values(this.props.projects).map((project) => (
            <ListGroupItem key={project.id}>
              <Link to={`/project/${project.id}`}> {project.name}</Link>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
