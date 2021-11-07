import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./views/Home";
import Quiz from "./views/Quiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path='/quiz/:id/:quizname' component={Quiz} />
            {/* <Route exact path='/edit/:id' component={Edit} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
