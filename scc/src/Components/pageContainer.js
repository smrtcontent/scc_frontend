import React, {useState} from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
import { Button } from '@material-ui/core'

const {hasCommandModifier} = KeyBindingUtil;

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeyCommand = this.handleKeyCommand.bind(this)
		this.state = { 
			editorState: EditorState.createEmpty(),
			selected: '' 
		}

		this.onSearch = (selectedText) => {
			this.setState({selected : selectedText})
			this.props.onSearch(selectedText)
		}
	
		this.onChange = (editorState) => {
				this.setState({editorState})
				}
	}

	suggestionsKeyBinding = (e) => {
		if (e.keyCode === 83 && hasCommandModifier(e)) {
			return 'find-antonyms'
		}
		return getDefaultKeyBinding(e)
	}

	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (command === 'find-antonyms') {
			const selected = getFragmentFromSelection(this.state.editorState);
			// this.onSearch(selected ? selected.map(x => x.getText()).join('\n') : '')
			alert(selected ? selected.map(x => x.getText()).join('\n') : '')
			return "handled"
		}
		if(newState) {
			this.onChange(newState);
			return 'handled'
		}
		return "not-handled"
	};

	onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	};

	onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};

	render() {
		return (
			<div className="editorContainer">
				{/* <Button 
                    onClick={this.onUnderlineClick}
                    variant= "contained"
                    color="default"
                    size="small"
                    >U</Button>
				<Button 
                    onClick={this.onBoldClick}
                    variant= "contained"
                    color="default"
                    size="small"
                    >
					<b>B</b>
				</Button>
				<Button 
                    onClick={this.onItalicClick}
                    variant= "contained"
                    color="default"
                    size="small"
                    >
					<em>I</em>
				</Button> */}
				<div 
					className="editors"
					>

					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						keyBindingFn={this.suggestionsKeyBinding}
						onChange={this.onChange}
					/>
				</div>
			</div>
		);
	}
}

export default PageContainer;
