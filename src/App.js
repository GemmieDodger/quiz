import React from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "bootstrap";
import Home from "./views/Home";
import Quiz from "./views/Quiz";
import Admin from "./views/Admin";
import CreateQuiz from "./views/CreateQuiz";
import EditQuiz from "./views/EditQuiz";
import Login from "./components/Login";
import { AuthProvider } from "./authProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/quiz/:id/:quizname" component={Quiz} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/create" component={CreateQuiz} />
              <Route
                exact
                path="/admin/edit/quiz/:id/:quizname"
                component={EditQuiz}
              />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
