import React from "react";
import ProjectList from "./components/projectList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Project from "./pages/project";
import Navbar from "./components/navbar";
import EditTask from "./pages/editTask";

import AddTask from "./pages/addTask";
import AddUser from "./pages/addUser";
import AddProject from "./pages/addProject";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return JSON.parse(localStorage.getItem("user")) !== null ? (
                <Redirect to="/projects" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/addTask">
            <AddTask />
          </Route>
          <Route path="/addUser">
            <AddUser />
          </Route>
          <Route path="/addProject">
            <AddProject />
          </Route>
          <Route path="/editTask/:id" component={EditTask} />
          <Route path="/project/:id" component={Project} />
          <Route path="/projects">
            <ProjectList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
