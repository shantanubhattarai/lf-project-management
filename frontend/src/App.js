import React from "react";
import ProjectList from "./components/projectList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Switch>
          <Route path="/admin">
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
