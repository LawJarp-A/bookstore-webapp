import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import "./loginpage.css";

const axios = require("axios");

function LoginPage() {
  var fields = {};
  const [error, setError] = useState();
  function login() {
    axios
      .post("http://localhost:5001/api/login", {
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        console.log(res.data);
        setError("Success");
        localStorage.setItem('accessToken', res.data.accessToken);
      },
      (err)=>{
        setError(err.message)
      });
  }
  return (
    <div className="loginpage">
      <Card>
        <CardContent>
          <div className="fields">
            <div className="fields">
              <label>Email</label>
            </div>
            <TextField
              required
              id="email"
              label="Required"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">
            <div className="fields">
              <label>Password</label>
            </div>
            <TextField
              required
              id="password"
              label="Required"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">{error}</div>
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={login}>
            Login
          </Button>
          <Button variant="outlined" href="/register">Register</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default LoginPage;
