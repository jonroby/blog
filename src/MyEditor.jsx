import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import createKaTeXPlugin from 'draft-js-katex-plugin';
import katex from 'katex'
/* import MathInput from '../src/components/math-input/components/app';*/


const kaTeXPlugin = createKaTeXPlugin({katex});

const { InsertButton } = kaTeXPlugin;


class MyEditor extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onChange = (editorState) => {
        this.setState({ editorState });
    };


    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    onToggleCode = () => {
        this.onChange(RichUtils.toggleCode(this.state.editorState));
    }

    onToggleKatex = () => {
        this.onChange(RichUtils.toggleCode(this.state.editorState));
    }


    render() {
        return (
            <div>
                <button onClick={this.onUnderlineClick}>Underline</button>
                <button onClick={this.onToggleCode}>Code Block</button>
                {/* <button onClick={this.onToggleKatex}>Katex</button> */}
                <InsertButton />
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    plugins={[kaTeXPlugin]}
                />
            </div>
        );
    }
}

export default MyEditor;