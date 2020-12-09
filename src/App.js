import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";

import HomePage from "./components/Home/HomePage";
import Header from "./components/LogoHeading/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import SideBar from "./components/SideBar/SideBar";
import AddProduct from "./components/AddProduct/AddProduct"

function App() {
  const [filters, setFilters] = useState([]);
  function getFilters(filters) {
    setFilters(filters);
  }
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/register"></Route>

          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>

          <Route path="/home">
            <div
              style={{ display: "flex", flexDirection: "row", height: "800px" }}
            >
              <div style={{ order: 0 }}>
                <SideBar getFiltersProp={(data) => getFilters(data)}></SideBar>
              </div>
              <div style={{ order: 1, flexGrow: 1 }}>
                <HomePage filters = {filters}></HomePage>
              </div>
            </div>
          </Route>
          <Route path="/sell"><AddProduct></AddProduct></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
