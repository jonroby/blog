import React, { Component } from "react";
import ReactQuill from "react-quill";
import { db } from "./firebase/firebase.js";

import { sentenceToCamel, camelToKabob } from "./helpers/caseConversions.js";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
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
    this.state = { text: "", category: "" }; // You can also pass a Quill Delta here
  }

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
    console.log("el ", el);

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
      <div>
        <button onClick={this.savePost}>Submit</button>

        <input
          type="text"
          value={this.state.category}
          onChange={this.handleChange("category")}
        />

        <ReactQuill
          value={this.state.text}
          onChange={this.handleQuillChange}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  }
}

export default Quill;
