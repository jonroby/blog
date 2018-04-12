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
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

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

  submit = text => {};

  render() {
    return (
      <div className="editor-container">
        <div className="editor-controls">
          <button onClick={this.onTitleClick}>H1</button>
          <button onClick={this.onSubtitleClick}>H2</button>

          <button onClick={this.onBoldClick}>Bold</button>
          <button onClick={this.onUnderlineClick}>Underline</button>
          <InsertButton />
          <div onClick={this.submit} />
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
