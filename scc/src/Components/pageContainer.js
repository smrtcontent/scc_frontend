import React from "react";
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import { Editor, EditorState, RichUtils, 
		 Modifier, getDefaultKeyBinding, KeyBindingUtil} from "draft-js";
import 'draft-js/dist/Draft.css'
import { Button, ButtonGroup } from '@material-ui/core'

const {hasCommandModifier} = KeyBindingUtil

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeyCommand = this.handleKeyCommand.bind(this)
		this.state = { 
			editorState: EditorState.createEmpty(),
			selected: '' 
		}
	}

	/**
	 *  Sets the focus to the editor when component is loaded
	 */
	componentDidMount() {
		this.setState({
			editorState: EditorState.moveFocusToEnd(this.state.editorState)
		})

	/**
	 * This function is to set the selected text in the selected state
	 */
	this.onSearch = (selectedText) => {
		this.setState({selected : selectedText})
		this.props.onSearch(selectedText)
	}
	
	/**
	 * This function updates the editorState
	 * 
	 * @param {*} editorState 
	 * @returns {void}
	 */
	this.onChange = (editorState) => this.setState({editorState})
		
	}

	/**
	 * Gets the current Editor State and the character to insert and then inserts
	 * the character in the editorState
	 * 
	 * @param {*} characterToInsert 
	 * @param {*} editorState 
	 * @returns 
	 */
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
	  
	/**
	 * Function that calls the insertCharacter function and then pushes the new state in the  
	 * setState function which in turn sets the new state of the editor.
	 */
	replace = e => {
		const newEditorState = this.insertCharacter(e, this.state.editorState);
		this.setState({
		editorState: newEditorState
		})
	}

	/**
	 * Checks and returns the command for the text editor
	 * 
	 */
	suggestionsKeyBinding = (e) => {
			 if (e.key === 'a' && hasCommandModifier(e)) return 'find-antonyms'
		else if (e.key === 'A' && hasCommandModifier(e)) return 'find-adjectives'
		else if (e.key === 'A' && e.altKey) 			 return 'find-approximate-rhymes'
		else if (e.key === 'C' && hasCommandModifier(e)) return 'find-consonant-match'
		else if (e.key === 'd' && hasCommandModifier(e)) return 'find-definitions'
		else if (e.key === 'F' && hasCommandModifier(e)) return 'find-frequent-follower'
		else if (e.key === 'f' && e.ctrlKey && e.altKey) return 'find-frequent-predecessors'
		else if (e.key === 'H' && hasCommandModifier(e)) return 'find-holonyms'
		else if (e.key === 'h' && e.altKey) 			 return 'find-homophones'
		else if (e.key === 'H' && e.altKey) 			 return 'find-hypernyms'
		else if (e.key === 'r' && hasCommandModifier(e)) return 'find-rhymes'
		else if (e.key === 'T' && e.altKey) 			 return 'find-triggers'
		else if (e.key === 'D' && e.ctrlKey) 			 console.log(e)
		else if (e.key === 'p' && hasCommandModifier(e)) return 'replace'

		return getDefaultKeyBinding(e)
	}

	/**
	 * Handles the shortcut commands and updates the parent states
	 * 
	 * @param {*} command 
	 * @param {*} query 
	 * @returns 
	 */
	handleCommand = (command, query) => {
		const selected = getFragmentFromSelection(this.state.editorState);
			if((selected ? selected.map(x => x.getText()).join('\n') : '').split(' ').length > 2){
				alert('Please select only one word to search ' + query + ' for!')
				return "handled"
			}
			if (query === 'Definitions')
				this.props.onDefChange(command,selected ? selected.map(x => x.getText()).join('\n') : '')
			else
				this.props.onSearch(command,selected ? selected.map(x => x.getText()).join('\n') : '')
			this.props.onChange(query)
			return "handled"
	}

	/**
	 * Handles the input command given to the editor and maps it to the specific
	 * function and sets the state of selection at textEditor.js
	 * 
	 * @param {*} command 
	 * @returns {Void}
	 */
	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(this.state.editorState,command)

		if (command === 'find-antonyms') 				this.handleCommand('findAntonyms', 'Antonyms')
		if (command === 'find-adjectives') 				this.handleCommand('findAdjectives', 'Adjectives')
		if (command === 'find-approximate-rhymes') 		this.handleCommand('findApproximateRhymes', 'Approximate Rhymes')
		if (command === 'find-consonant-match') 		this.handleCommand('findConsonantMatch', 'Consonant Match')
		if (command === 'find-rhymes') 					this.handleCommand('findRhymes', 'Rhymes')
		if (command === 'find-triggers') 				this.handleCommand('findTriggers', 'Triggers')
		if (command === 'find-definitions') 			this.handleCommand('findDefinitions', 'Definitions')
		if (command === 'find-frequent-follower') 		this.handleCommand('findFrequentFollower', 'Frequent Followers')
		if (command === 'find-frequent-predecessors') 	this.handleCommand('findFrequentPredecessors', 'Frequent Predecessors')
		if (command === 'find-holonyms') 				this.handleCommand('findHolonyms', 'Holonyms')
		if (command === 'find-homophones') 				this.handleCommand('findHomophones', 'Homophones')
		if (command === 'find-hypernyms') 				this.handleCommand('findHypernyms', 'Hypernyms')
		if (command === 'replace') 						this.replace(this.props.reptext)
		if(newState) {
			this.onChange(newState);
			return 'handled'
		}
		return "not-handled"
	}

	/**
	 * The formatting options
	 */

	onUnderlineClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"))
	}

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"))
	}

	onItalicClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"))
	}

	render() {
		return (
			<div className="editorContainer">
				<ButtonGroup>
					<Button 
						onClick={this.onUnderlineClick}
						style = {{backgroundColor:'#f6f6f6'}}
						variant= "contained"
						size="small"
						>U</Button>
					<Button 
						onClick={this.onBoldClick}
						variant= "contained"
						style = {{backgroundColor:'#f6f6f6'}}
						size="small"
						>
						<b>B</b>
					</Button>
					<Button 
						onClick={this.onItalicClick}
						variant= "contained"
						style = {{backgroundColor:'#f6f6f6'}}
						size="small"
						>
						<em>I</em>
					</Button>
				</ButtonGroup>
				<div 
					className="editors"
					>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						keyBindingFn={this.suggestionsKeyBinding}
						onChange={this.onChange}
						spellCheck
						placeholder='Begin typing here...'
					/>
				</div>
			</div>
		)
	}
}

export default PageContainer;
