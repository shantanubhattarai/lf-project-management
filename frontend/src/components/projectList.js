import React from "react";
import { connect } from "react-redux";
import * as adminActions from "../actions/adminActions";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class ProjectList extends React.Component {
  componentDidMount() {
    this.props.setProjects();
  }

  render() {
    return (
      <div>
        <ListGroup>
          {Object.values(this.props.projects).map((project) => (
            <ListGroupItem key={project.id}>{project.name}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.admin.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProjects: () => {
      dispatch(adminActions.showProjects());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
