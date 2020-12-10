import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import TextField from "@material-ui/core/TextField";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import "./posts.css";

const axios = require("axios");

const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
  
};

function Post(props) {

  const [value, setValue] = useState(props.rating);
  const [feedback, setFeedback] = useState("");
  const [feedbackToShow, setFeedbacktoshow] = useState([]);
  
  function sendOffer() {
    axios
      .post(
        "http://localhost:5001/api/offers",
        {
          seller_email: props.post.seller,
          buyer_email: props.user,
          product_id: props.post.product_id,
        },
        config
      )
      .then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          alert(err.message);
        }
      );
  }

  function updateRating() {
    axios
      .put(
        "http://localhost:5001/api/ratings",
        {
          rating: value,
        },
        config
      )
      .then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          alert(err.message);
        }
      );
  }


useEffect(()=>{
  function getFeedback() {
    axios
      .get(
        "http://localhost:5001/api/reviews",
        { params: {
          product_id: props.post.product_id,
        }},
        config
      )
      .then(
        (res) => {
          console.log(res.data);
          setFeedbacktoshow(res.data);
        },
        (err) => {
          alert(err.message);
        }
      );
  }
  getFeedback()
},[props.post.product_id])

  function updateFeedback() {
    axios
      .post(
        "http://localhost:5001/api/reviews",
        {
          product_id: props.post.product_id,
          product_name: props.post.product_name,
          reviewer_email: props.user,
          comment: feedback,
        },
        config
      )
      .then(
        (res) => {
          updateRating();
        },
        (err) => {
          alert(err.message);
        }
      );
  }

  return (
    <div className="post">
      <Card variant="outlined">
        <CardContent>
          <div className="info">
            <div style={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2">
                Book Title: {props.post.product_name}
              </Typography>
              <Typography color="textSecondary">
                Years used: {props.post.years_used}
              </Typography>
              <Typography color="textSecondary">
                Subject: {props.post.subject}
              </Typography>
              <Typography color="textSecondary">
                Sold by: {props.post.seller}
              </Typography>
              <br></br>
              <Typography variant="h6">Price: {props.post.price}</Typography>
              <div className="feedback">
                <TextField
                  id="feedback"
                  label="Feed Back"
                  variant="outlined"
                  onChange={(event) => {
                    setFeedback(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="feedbackItems">
            <Typography variant="h6">Reviews</Typography>

              <List>
                {feedbackToShow.map((item) => (
                  <div key={item._id}>
                    <ListItem alignItems="right">
                      <ListItemText
                        primary={item.reviewer_email}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >{item.comment}</Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <hr></hr>
                  </div>
                ))}
              </List>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Please confirm offer")) {
                sendOffer();
              }
            }}
          >
            Send Offer
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              updateFeedback();
            }}
          >
            Submit Feedback
          </Button>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log(newValue);
            }}
          />
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
