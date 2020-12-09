import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./posts.css";

const axios = require("axios");

const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
  
};

function Post(props) {
  
  function sendOffer(){
    axios.post("http://localhost:5001/api/offers",{
      seller_email: props.post.seller,
      buyer_email: props.user,
      product_id: props.post.product_id,
    },
    config)
    .then((res)=>{
      console.log(res.data);
    },
    (err)=> {
      alert("Try again", err)
    })
  }

  return (
    <div className="post">
      <Card variant="outlined">
        <CardContent>
          <div className="info">
            <div>
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
            </div>
            <div className="about">
              
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" onClick={()=>{
            // eslint-disable-next-line no-restricted-globals
            if(confirm("Please confirm offer"))
            {sendOffer()}
            }}>
            Send Offer
          </Button>
          <Button variant="outlined" size="small">
            Feedback
          </Button>
          <Button variant="outlined" size="small">
            Rate
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
