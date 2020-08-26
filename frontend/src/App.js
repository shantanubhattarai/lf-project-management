import React from "react";
import ProjectList from "./components/projectList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Project from "./pages/project";
import Navbar from "./components/navbar";
import EditTask from "./pages/editTask";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <Switch>
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
