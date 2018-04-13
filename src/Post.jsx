import React, { Component } from "react";
import { db } from "./firebase/firebase.js";

import "./Post.css";

// https://www.webdesignerdepot.com/2015/08/30-impactful-black-and-white-websites/
// http://www.laureboutmy.com/

class Posts extends Component {
  state = {
    postText: ""
  };

  componentDidMount() {
    const title = this.getPostTitle();
    console.log("title ", title);
    this.fetchPost(title);
  }

  fetchPost = title => {
    console.log("title", title);
    db
      .ref(`posts/${title}`)
      .orderByKey()
      .on("value", snapshot => {
        console.log("snapshot ", snapshot.key);
        this.setState({ postText: snapshot.val().text });
      });
  };

  getPostTitle = () => {
    return this.props.location.pathname.split("/")[2];
  };

  renderPost = () => {
    if (this.state.postText !== "") {
      return (
        <div className="post">
          <div dangerouslySetInnerHTML={{ __html: this.state.postText }} />;
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="post-container">
        <div className="contents">Contents</div>
        {this.renderPost()}
        <div className="social-links">
          <div>
            <i className="fa fa-github" />
            <i className="fa fa-linkedin" />
            <i className="fa fa-google" />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
