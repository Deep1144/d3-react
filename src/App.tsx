import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import BarChart from "./charts/Bar.chart";
import Layout from "./layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/">
          <BarChart />
        </Route>

        <Route exact path="/home">
          <div>Home</div>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
