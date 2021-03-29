import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import { Routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Layout>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/bar-chart" />}
        ></Route>
        {Routes.map((e) => {
          return (
            <Route
              path={"/" + e.route}
              exact
              key={e.route}
              component={e.component}
            ></Route>
          );
        })}
      </Layout>
    </Router>
  );
}

export default App;
