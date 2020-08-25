import React from "react";
import "./App.css";
import ProjectList from "./components/projectList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Router>
          <Switch>
            <Route path="/admin">
              <ProjectList />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
