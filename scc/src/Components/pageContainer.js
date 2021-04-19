import React from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
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

	editorLog = () => {
		console.log(this.state.editorState.getCurrentContent().getPlainText())
		alert('Check Log in console')
	}

	insertCharacter = (characterToInsert, editorState) => {
		const currentContent = editorState.getCurrentContent(),
				currentSelection = editorState.getSelection();
		
		const newContent = Modifier.replaceText(
			currentContent,
			currentSelection,
			characterToInsert
		);
		
		const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
		
		return  newEditorState;
	}
	  
	replace = e => {
		const newEditorState = this.insertCharacter(e, this.state.editorState);
		this.setState({
		editorState: newEditorState
		})
	}

	handleDataChange = (c,e) => {
		this.props.onSearch(c,e)
	}

	suggestionsKeyBinding = (e) => {
		if (e.keyCode === 65 && hasCommandModifier(e)) { // 65 -> a
			return 'find-antonyms'
		} else if (e.keyCode === 82 && hasCommandModifier(e)) { // 82 -> r
			return 'find-rhymes'
		} else if (e.keyCode === 83 && hasCommandModifier(e)) { // 83 -> s
			return 'find-triggers'
		} else if (e.keyCode === 81 && hasCommandModifier(e)) { //  ->81 -> q
			return 'find-definitions'
		} else if (e.keyCode === 80 && hasCommandModifier(e)) { // 80 -> p
			return 'replace'
		}
		return getDefaultKeyBinding(e)
	}

	checkLen = e => (e ? e.map(x => x.getText()).join('\n') : '').split(' ').length > 2
	textReturn = e => (e ? e.map(x => x.getText()).join('\n') : '') 

	/**
	 * Handles the input command given to the editor and maps it to the specific
	 * function and sets the state of selection at textEditor.js
	 * 
	 * @param {*} command 
	 * @returns {Void}
	 */
	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (command === 'find-antonyms') {
			const selected = getFragmentFromSelection(this.state.editorState);
			if(this.checkLen(selected)){
				alert("Please select only one word to search antonyms for!")
				return "handled"
			}
			this.handleDataChange('findAntonyms',this.textReturn(selected))
			this.props.onChange('Antonyms')
			return "handled"
		}
		if (command === 'find-rhymes') {
			const selected = getFragmentFromSelection(this.state.editorState);
			if(this.checkLen(selected)){
				alert("Please select only one word to search Rhymes for!")
				return "handled"
			}
			this.handleDataChange('findRhymes',this.textReturn(selected))
			this.props.onChange('Rhymes')
			return "handled"
		}
		if (command === 'find-triggers') {
			const selected = getFragmentFromSelection(this.state.editorState);
			if(this.checkLen(selected)){
				alert("Please select only one word to search Triggers for!")
				return "handled"
			}
			this.handleDataChange('findTriggers',this.textReturn(selected))
			this.props.onChange('Triggers')
			return "handled"
		}
		if (command === 'find-definitions') {
			const selected = getFragmentFromSelection(this.state.editorState);
			if(this.checkLen(selected)){
				alert("Please select only one word to search Definitions for!")
				return "handled"
			}
			this.props.onDefChange('findDefinitions',this.textReturn(selected))
			this.props.onChange('Definitions')
			return "handled"
		}
		if (command === 'replace') {
			this.replace(this.props.reptext)
			// alert(this.props.reptext)
		}
		if(newState) {
			this.onChange(newState);
			return 'handled'
		}
		return "not-handled"
	}

	// onUnderlineClick = () => {
	// 	this.onChange(
	// 		RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
	// 	)
	// }

	// onBoldClick = () => {
	// 	this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"))
	// }

	// onItalicClick = () => {
	// 	this.onChange(
	// 		RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
	// 	)
	// }

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
				<div className='mt-3 mb-0'>
					<Button
					variant='contained'
					color='primary'
					onClick={this.editorLog}
					>
						Editor-log
					</Button>
				</div>
			</div>
		);
	}
}

export default PageContainer;
