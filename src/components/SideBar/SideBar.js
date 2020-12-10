import React, { useState, useEffect } from "react";
import { Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./sidebar.css";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const axios = require("axios");
const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const MyCheckbox = withStyles({
  root: {
    color: "#00000",
    "&$checked": {
      color: "#00000",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const subjects = ["Math", "Physics", "Chemistry"];

function SideBar(props) {
  const [subjectsInFilter, setFilters] = useState({
    Math: false,
    Physics: false,
    Chemistry: false,
  });
  const [offers, setOffers] = useState([]);

  function handleChange(event) {
    setFilters({
      ...subjectsInFilter,
      [event.target.name]: event.target.checked,
    });
  }

  function getOffers() {
    axios.get("http://localhost:5001/api/offers", config).then(
      (res) => {
        setOffers(res.data);
        console.log(res.data);
      },
      (err) => {
        alert("Error, try refreshing");
      }
    );
  }

  const checkboxes = [
    {
      name: "Math",
    },
    {
      name: "Physics",
    },
    {
      name: "Chemistry",
    },
  ];

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="sidebar">
      <hr></hr>
      <Typography variant="h6">Filters - Subjects</Typography>
      <hr></hr>
      <div>
        {checkboxes.map((item) => (
          <div className="checkboxes" key={item.name}>
            <MyCheckbox
              name={item.name}
              checked={subjectsInFilter[item.name]}
              onChange={handleChange}
            ></MyCheckbox>
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <hr></hr>

      <div className="button">
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={() => {
            props.getFiltersProp(
              subjects.filter((sub) => {
                return subjectsInFilter[sub];
              })
            );
          }}
        >
          Apply Filters
        </Button>
      </div>
      <hr></hr>
      <div className="offers">
        <Typography variant="h6" color="textSecondary">
          Offers
        </Typography>
        <hr></hr>
        {offers.map((item) => (
          <div>
            <Typography noWrap={true}>BY: {item.buyer_email}</Typography>
            <Typography noWrap={true}> Product: {item.product_id}</Typography>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
