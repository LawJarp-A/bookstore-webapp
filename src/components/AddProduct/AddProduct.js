import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import "./addproducts.css";

const axios = require("axios");
const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function AddProduct() {
  var fields = {};
  const [error, setError] = useState();
  function submitPost() {
    axios.post("http://localhost:5001/api/products", fields, config).then(
      (res) => {
        setError("Successful");
      },
      (err) => {
        setError(err.message);
      }
    );
  }
  return (
    <div className="addproducts">
      <Card>
        <CardContent>
          <div className="fields">
            <div className="fields">
              <label>Name</label>
            </div>
            <TextField
              required
              id="product_name"
              label="Required"
              defaultValue="Book Name"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">
            <div className="fields">
              <label>Subject</label>
            </div>
            <TextField
              required
              id="subject"
              label="Required"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">
            <div className="fields">
              <label>Years Used</label>
            </div>
            <TextField
              required
              id="years_used"
              label="Required"
              //   defaultValue="Book Name"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">
            <div className="fields">
              <label>Price</label>
            </div>
            <TextField
              required
              id="price"
              label="Required"
              //   defaultValue="Book Name"
              variant="outlined"
              onChange={(event) => {
                fields[event.target.id] = event.target.value;
              }}
            />
          </div>
          <div className="fields">{error}</div>
        </CardContent>
        <div className="buttons">
        <CardActions>
            <Button variant="outlined" onClick={submitPost}>
              Sell
            </Button>
            <Button variant="outlined" href="/home">
              Home
            </Button>
        </CardActions>
        </div>
      </Card>
    </div>
  );
}

export default AddProduct;
