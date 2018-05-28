// import React, { Component } from "react";
// import { Editor, EditorState, RichUtils } from "draft-js";

// import createKaTeXPlugin from "draft-js-katex-plugin";
// import katex from "katex";
// /* import MathInput from '../src/components/math-input/components/app';*/

// const kaTeXPlugin = createKaTeXPlugin({ katex });

// const { InsertButton } = kaTeXPlugin;

// class MyEditor extends Component {
//   constructor() {
//     super();
//     this.state = {
//       editorState: EditorState.createEmpty()
//     };
//   }

//   onChange = editorState => {
//     this.setState({ editorState });
//   };

//   handleKeyCommand = command => {
//     const newState = RichUtils.handleKeyCommand(
//       this.state.editorState,
//       command
//     );

//     if (newState) {
//       this.onChange(newState);
//       return "handled";
//     }

//     return "not-handled";
//   };

//   onUnderlineClick = () => {
//     this.onChange(
//       RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
//     );
//   };

//   onToggleCode = () => {
//     this.onChange(RichUtils.toggleCode(this.state.editorState));
//   };

//   onToggleKatex = () => {
//     this.onChange(RichUtils.toggleCode(this.state.editorState));
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.onUnderlineClick}>Underline</button>
//         <button onClick={this.onToggleCode}>Code Block</button>
//         <button onClick={this.onToggleKatex}>Katex</button>

//         <InsertButton />
//         <Editor
//           editorState={this.state.editorState}
//           handleKeyCommand={this.handleKeyCommand}
//           onChange={this.onChange}
//           plugins={[kaTeXPlugin]}
//         />
//       </div>
//     );
//   }
// }

// export default MyEditor;

import React, { Component } from "react";

import { db } from "./firebase/firebase.js";

import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import katex from "katex";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createKaTeXPlugin from "draft-js-katex-plugin";

import "./Editor.css";

// import MathInput from "../src/components/math-input/components/app";

const kaTeXPlugin = createKaTeXPlugin({ katex });
const linkifyPlugin = createLinkifyPlugin();

const { InsertButton } = kaTeXPlugin;

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    if (this.props.location.pathname !== "/") {
    }

    this.fetchPosts();
  }

  fetchPosts = () => {
    db
      .ref("posts")
      .orderByKey()
      .on("child_added", snapshot => {
        console.log("snapshot ", snapshot.key);
        const val = snapshot.val().raw;
        console.log("snapshop ", val);

        const backFromRaw = convertFromRaw({ ...val, entityMap: {} });
        console.log("backFromRaw", backFromRaw);

        // const state = ContentState.createFromBlockArray(
        //   blocksFromHTML.contentBlocks,
        //   blocksFromHTML.entityMap
        // );

        this.setState({ editorState: backFromRaw });
      });
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  onTitleClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "H1"));
  };

  onSubtitleClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "H2"));
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  };

  savePost = () => {
    const raw = convertToRaw(this.state.editorState.getCurrentContent());
    console.log("raw ", raw);

    console.log("db.ref ", db.ref("/posts/Currying"));

    db.ref("/posts/Currying").set({ raw: raw });

    // const sampleMarkup =
    //       '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    //       '<a href="http://www.facebook.com">Example link</a>';

    // save this for editor to EDIT post???
    // const backFromRaw = convertFromRaw(raw);
    // console.log("backFromRaw", backFromRaw);

    // this.state = {
    //   editorState: EditorState.createWithContent(state),
    // };
  };

  updatePost = () => {
    const raw = convertToRaw(this.state.editorState.getCurrentContent());
    db.ref("/posts/Currying").set("from site");
  };

  render() {
    if (APP_ENV === 'prod') return null;
    return (
      <div className="editor-container">
        <div className="editor-controls">
          <button onClick={this.onTitleClick}>H1</button>
          <button onClick={this.onSubtitleClick}>H2</button>

          <button onClick={this.onBoldClick}>Bold</button>
          <button onClick={this.onUnderlineClick}>Underline</button>
          <InsertButton />

          <button onClick={this.savePost}>Save Post</button>
          <button onClick={this.updatePost}>Update Post</button>
        </div>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[kaTeXPlugin]}
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
