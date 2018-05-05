import React, { Component } from "react";
import { Navbar } from './Navbar.jsx';
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
      rightWidth: 1,
        scriptAdded: false,
    };

      /* this.socialLinksRef = React.createRef();*/
  }

  componentDidMount() {
    const title = this.getPostTitle();
    this.fetchPost(title);

      /* if (this.mathJaxScript) {
       *     this.mathJaxScript.parentNode.removeChild(this.mathJaxScript)
       * }*/

      /* let script = document.createElement("script");
       * script.id = "mathjax-script"
       * script.type = "text/javascript";
       * script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML";
       * console.log('script 2', script)
       * this.mathJaxScript = document.getElementsByTagName("head")[0].appendChild(script);    */
      console.log('mounting ')



  }

  componentDidUpdate() {
      /* if (this.socialLinksRef.current.offsetWidth !== this.state.rightWidth) {
       *   this.setState({ rightWidth: this.socialLinksRef.current.offsetWidth });
       * }*/
          let script = document.createElement("script");
          script.id = "mathjax-script"
          script.type = "text/javascript";
          script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML";
          console.log('script 2', script)
          this.mathJaxScript = document.getElementsByTagName("head")[0].appendChild(script);
          script = null;
  }

  componentWillUnmount() {
      this.mathJaxScript.parentNode.removeChild(this.mathJaxScript)
      this.mathJaxScript = null;
      window.MathJax = undefined;
  }

    fetchPost = title => {
    const titleCamel = kabobToCamel(title);
    db
      .ref(`posts/${titleCamel}`)
      .orderByKey()
      .on("value", snapshot => {
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
