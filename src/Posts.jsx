import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InlineMath } from "react-katex";
import Contents from "./Contents.jsx";
import SocialLinks from "./SocialMediaLinks.jsx";
import { db } from "./firebase/firebase.js";

import "./Posts.css";

// <div className="posts-item-number">
//   <InlineMath math={katexNum} />
// </div>

const renderPosts = posts => {
  return posts.map((post, i) => {
    const katexNum = `\\textit{${i + 1}}`;
    return (
      <div className="posts-item-container">
        <div className="posts-item-metadata">
          <div className="posts-item-metadata-category">{post.category}</div>
          <div className="posts-item-metadata-line" />
        </div>

        <div className="posts-item-data">
          <Link to={`posts/${post.titleKabob}`}>
            <div className="posts-item-data-title">{post.title}</div>
          </Link>
          <div className="posts-item-data-subtitle">{post.subtitle}</div>
        </div>
      </div>
    );
  });
};

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    db
      .ref("posts")
      .orderByKey()
      .on("value", snapshot => {
        const posts = [];
        snapshot.forEach(child => {
          console.log("child ", child.val());
          posts.push(child.val());
        });

        this.setState({ posts });
      });
    // .catch(err => {
    //   console.log("err ", err);
    // });
  };

  render() {
    return (
      <div className="posts-screen">
        <div className="posts-screen-left" />
        <div className="posts-screen-middle">
          {renderPosts(this.state.posts)}
        </div>
        <div className="posts-screen-right">
          <SocialLinks />
        </div>
      </div>
    );
  }
}

export default Posts;
