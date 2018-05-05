import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const postsStyles = {
  backgroundColor: "#242729",
  color: "white"
};

const postStyles = {
  backgroundColor: "white",
  color: "#d3d3d3",
  borderBottom: "1px solid #fafafa"
};

const aboutStyles = {
  backgroundColor: "white",
  color: "#242729"
};

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const loc = this.props.location.pathname.split("/");
      const homePage = loc[1] === "" && loc.length === 2;
      const postsPage = loc[1] === "posts" && loc.length === 2;
      const postPage = loc[1] === "posts" && loc.length === 3;
      const aboutPage = loc[1] === "about";

      let styles = postsPage || homePage ? postsStyles : postPage ? postStyles : aboutStyles;

    return (
        <div className="navbar-container" style={styles}>
            <div className="navbar">
                <div id={postsPage || postPage ? "navbar-active-tab" : ""}className="navbar-posts">
                    <Link to={"/posts"}>Posts</Link>
                </div>
                <div className="navbar-jonroby">
                    <div className="navbar-jon">Jon</div>
                    <div className="navbar-roby">Roby</div>
                </div>
                <div id={aboutPage ? "navbar-active-tab" : ""}className="navbar-about">
                    <Link to={"/about"}>About</Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Navbar;
