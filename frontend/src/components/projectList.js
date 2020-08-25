import React from "react";
import { connect } from "react-redux";
import * as adminActions from "../actions/adminActions";
import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class ProjectList extends React.Component {
  componentDidMount() {
    httpUtils
      .get(config.endPoints.adminProjects)
      .then((response) => this.props.setProjects(response));
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
    setProjects: (projects) => {
      dispatch(adminActions.showProjects(projects));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
