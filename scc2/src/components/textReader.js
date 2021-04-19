import React, { Component, useState } from 'react';

import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import { Button } from '@material-ui/core'

const {hasCommandModifier} = KeyBindingUtil;

const Reader = () => {
    const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(e.target.files[0])}

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
      )

return (
    <div>
    <input type="file" onChange={(e) => showFile(e)} />
        <div className="editorContainer">
            <div 
                className="editors"
                >
                <Editor
                    editorState={editorState}
                    // handleKeyCommand={handleKeyCommand}
                    // keyBindingFn={suggestionsKeyBinding}
                />
            </div>
        </div>
    </div>
)
}


export default Reader;
