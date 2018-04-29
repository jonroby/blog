import React, { Component } from "react";
import ReactQuill from "react-quill";
import { db } from "./firebase/firebase.js";

import {
  sentenceToCamel,
  camelToKabob,
  kabobToCamel
} from "./helpers/caseConversions.js";

import "./Quill.css";
import "./Post.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [ {"background": [ "#f3f3f3" ]} ],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image", "formula"],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["clean"]
    ]
};

const formats = [
    "background",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "formula",
  "script",
  "align"
];

class Quill extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", category: "", theme: "bubble" }; // You can also pass a Quill Delta here
  }

  componentDidMount() {
    let element = document.getElementsByClassName('ql-tooltip')[0];
    console.log('el ', element);

    element.addEventListener("mousedown", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    const url = this.props.location.pathname.split("/")[2];
    this.fetchPost(url);
  }

  fetchPost = title => {
    console.log("title", title);
    const titleCamel = kabobToCamel(title);
    db
      .ref(`posts/${titleCamel}`)
      .orderByKey()
      .on("value", snapshot => {
        console.log("snapshot ", snapshot.val());
        if (snapshot.val()) {
          this.setState({
            category: snapshot.val().category,
            text: snapshot.val().text
          });
        }
      });
  };

  handleQuillChange = value => {
    this.setState({ text: value });
  };

  handleChange = key => event => {
    console.log("key", key);
    event.preventDefault();
    this.setState({ [key]: event.target.value });
  };

  getMetadata = text => {
    const el = document.createElement("html");
    el.innerHTML = text;

    const titleEl = el.getElementsByTagName("h1");
    const subtitleEl = el.getElementsByTagName("h2");
    const sectionsEl = el.getElementsByTagName("li");

    const title = titleEl[0].childNodes[0].nodeValue;
    const subtitle = subtitleEl[0].childNodes[0].nodeValue;

    const sections = [];
    for (let i = 0; i < sectionsEl.length; i++) {
      sections.push(sectionsEl[i].childNodes[0].nodeValue);
    }

    const titleCamel = sentenceToCamel(title);
    const titleKabob = camelToKabob(titleCamel);

    const contents = sections.filter(i => i);

    return { title, titleCamel, titleKabob, subtitle, contents };
  };

  savePost = () => {
    const { text, category } = this.state;

    const {
      title,
      titleCamel,
      titleKabob,
      subtitle,
      contents
    } = this.getMetadata(text);

    db.ref(`/posts/${titleCamel}`).set({
      title,
      text,
      titleKabob,
      subtitle,
      contents,
      category
    });
  };

  render() {
    return (
      <div className="editor-screen">
        <div className="editor-screen-middle">
          <div className="editor-controls">
            <button onClick={this.savePost}>Submit</button>

            <input
              type="text"
              value={this.state.category}
              onChange={this.handleChange("category")}
            />
          </div>

          <div className="editor-quill">
            <ReactQuill
              value={this.state.text}
              onChange={this.handleQuillChange}
              modules={modules}
              formats={formats}
              theme="bubble"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Quill;
