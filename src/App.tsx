import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import BarChart from "./charts/Bar.chart";
import Layout from "./layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Layout>
        <Redirect exact path="/" to="bar-chart"></Redirect>
        <Route exact path="/bar-chart">
          <BarChart />
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
