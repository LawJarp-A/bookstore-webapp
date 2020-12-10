import React, { useState } from "react";
import  { Redirect } from 'react-router-dom'

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import "./registerpage.css";

const axios = require("axios");

function Register() {
  var fields = {};
  const [error, setError] = useState();
//   const [loginState, setLogin] = useState(true);
  function register() {
    axios
      .post("http://localhost:5001/api/register", {
        username: fields.username,
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        console.log(res.data);
        setError("Registered");
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
              <label>Username</label>
            </div>
            <TextField
              required
              id="username"
              label="Required"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
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
          <Button variant="outlined" onClick={register}>
            Register
          </Button>
          <Button variant="outlined" href="/login">Login</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Register;
