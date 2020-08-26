import React from "react";
import * as taskActions from "../actions/taskActions";
import { connect } from "react-redux";

class Task extends React.Component {
  render() {
    if (!this.props.assignedUser.id)
      if (this.props.task.id) this.props.getAssignedUser(this.props.task.id);
    if (!this.props.task.id) {
      return <div>No task selected</div>;
    }
    return (
      <div className="card">
        <div className="card-header">
          <div className="float-left">{this.props.task.title}</div>
          <div className="float-right">
            Assigned To: {this.props.assignedUser.first_name}{" "}
            {this.props.assignedUser.last_name}
          </div>
        </div>
        <div className="card-body">{this.props.task.description}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    task: state.task.currentTask,
    assignedUser: state.task.assignedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAssignedUser: (taskId) => {
      dispatch(taskActions.getAssignedUser(taskId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
