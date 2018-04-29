import React, { Component } from "react";
import Contents from "./Contents.jsx";
import SocialLinks from "./SocialMediaLinks.jsx";
import { kabobToCamel } from "./helpers/caseConversions.js";
import { db } from "./firebase/firebase.js";

import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: "",
      contents: [],
      rightWidth: 1
    };

      /* this.socialLinksRef = React.createRef();*/
  }

  componentDidMount() {
    const title = this.getPostTitle();
    this.fetchPost(title);
  }

  componentDidUpdate() {
      /* if (this.socialLinksRef.current.offsetWidth !== this.state.rightWidth) {
       *   this.setState({ rightWidth: this.socialLinksRef.current.offsetWidth });
       * }*/
  }

  fetchPost = title => {
    console.log("title", title);
    const titleCamel = kabobToCamel(title);
    db
      .ref(`posts/${titleCamel}`)
      .orderByKey()
      .on("value", snapshot => {
        console.log("snapshot ", snapshot.val().contents);
        if (snapshot.val()) {
          this.setState({
            contents: snapshot.val().sections,
            postText: snapshot.val().text
          });
        }
      });
  };

  getPostTitle = () => {
    return this.props.location.pathname.split("/")[2];
  };

  renderPost = () => {
    if (this.state.postText !== "") {
      return (
        <div className="post">
          <div dangerouslySetInnerHTML={{ __html: this.state.postText }} />
        </div>
      );
    }

    return null;
  };

  render() {
      /* const width =
       *   (this.socialLinksRef.current &&
       *     this.socialLinksRef.current.offsetWidth) ||
       *   1;*/

    return (
      <div className="post-container">
          {/* <div className="post-screen-right">
              <Contents width={width} contents={this.state.contents} />
              </div> */}
        {this.renderPost()}
          {/* <div className="post-screen-right" ref={this.socialLinksRef}>
              <SocialLinks width={width} />
              </div> */}
      </div>
    );
  }
}

export default Post;
