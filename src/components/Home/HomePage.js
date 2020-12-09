import React, { useState, useEffect } from "react";
import Post from "../Posts/Post";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import "./homepage.css";
import { Redirect } from "react-router-dom";
const axios = require("axios");

const token = localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function HomePage(props) {
  //Send request and get posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  function getProducts() {
    axios.get("http://localhost:5001/api/products").then(
      (res) => {
        console.log(res.data);
        setPosts(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function getUserData() {
    axios.get("http://localhost:5001/api/users", config).then(
      (res) => {
        console.log("HERE", res.data);
        setUser(res.data);
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  useEffect(() => {
    getProducts();
    getUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <div className="homepage">
          <div className="avatar">
            <div className="avatarcomp">
              <Avatar>{user.email[0]}</Avatar>
            </div>
            <div className="avatarcomp">
              <Typography variant="h6" color="textPrimary">
                Welcome User! <br></br> {user.email}
              </Typography>
            </div>
            <div className="buttonHP">
              <div className="eachButton">
                <Button variant="contained" href="/sell">
                  Sell Book
                </Button>
              </div>
              <div className="eachButton">
                <Button
                  variant="contained"
                  href="/login"
                  onClick={() => {
                    localStorage.setItem("accessToken", "None");
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <div>
            {posts
              .filter((post) => props.filters.includes(post.subject))
              .map((item) => (
                <Post post={item} user={user.email}></Post>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
