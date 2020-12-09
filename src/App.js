import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";

import HomePage from "./components/Home/HomePage";
import Header from "./components/LogoHeading/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/ResgistPage";
import SideBar from "./components/SideBar/SideBar";
import AddProduct from "./components/AddProduct/AddProduct";

const axios = require("axios");

const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function App() {
  const [filters, setFilters] = useState([]);
  function getFilters(filters) {
    setFilters(filters);
  }

  function isAuth() {
    axios.get("http://localhost:5001/api/users", config).then(
      (res) => {
        console.log(res.data);
        return <Redirect to="/home" />;
      },
      (err) => {
        console.log(err);
        return <Redirect to="/login" />;
      }
    );
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/register">
            <RegisterPage></RegisterPage>
          </Route>

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
                <HomePage filters={filters}></HomePage>
              </div>
            </div>
          </Route>
          <Route path="/sell">
            <AddProduct></AddProduct>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
