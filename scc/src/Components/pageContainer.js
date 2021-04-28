import React from "react";
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import {
	Editor, EditorState, RichUtils,
	Modifier, getDefaultKeyBinding, KeyBindingUtil
} from "draft-js";
import 'draft-js/dist/Draft.css'
import SimilarWordEnd from './similarWordEnd'
import SimilarWordStart from './similarWordStart'
import SimilarWordStartEnd from './similarWordStartEnd'
import { Button, ButtonGroup } from '@material-ui/core'

const { hasCommandModifier } = KeyBindingUtil

class PageContainer extends React.Component {

	setFocus = () =>  {
		this.setState({
			editorState: EditorState.moveFocusToEnd(this.state.editorState)
		})
	}

	constructor(props) {
		super(props);
		this.handleKeyCommand = this.handleKeyCommand.bind(this)
		this.state = {
			editorState: EditorState.createEmpty(),
			selected: '',
			openEnd: false,
			openStart: false,
			openStartEnd: false,
		}
		
		props.changeFun(() => this.setFocus)
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
			this.setState({ selected: selectedText })
			this.props.onSearch(selectedText)
		}

		/**
		 * This function updates the editorState
		 * 
		 * @param {*} editorState 
		 * @returns {void}
		 */
		this.onChange = (editorState) => this.setState({ editorState })
	}

	componentDidUpdate() {
		const selected = getFragmentFromSelection(this.state.editorState);
		var Selected = selected ? selected.map(x => x.getText()).join('\n') : ''
		if (Selected !== '' ) this.props.setSelectedText(Selected)
		if (this.props.buttonCommand !== undefined) this.handleKeyCommand(this.props.buttonCommand)
	}
	
	

	setOpenEnd = (e) => this.setState({ openEnd: e })
	setOpenStart = (e) => this.setState({ openStart: e })
	setOpenStartEnd = (e) => this.setState({ openStartEnd: e })
	


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

		return newEditorState;
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
			if (e.key === 'a' && e.altKey ) return 'find-antonyms'
		else if (e.key === 'A' && hasCommandModifier(e)) return 'find-adjectives'
		else if (e.key === 'A' && e.altKey) return 'find-approximate-rhymes'
		else if (e.key === 'C' && hasCommandModifier(e) ) return 'find-consonant-match'
		else if (e.key === 'd' && hasCommandModifier(e) ) return 'find-definitions'
		else if (e.key === 'D' && e.altKey ) return 'find-spelt-similar'
		else if (e.key === 'e' && hasCommandModifier(e) ) return 'find-similar-end'
		else if (e.key === 'E' && hasCommandModifier(e) ) return 'find-similar-start-end'
		else if (e.key === 'F' && hasCommandModifier(e) ) return 'find-frequent-follower'
		else if (e.key === 'f' && e.ctrlKey && e.altKey ) return 'find-frequent-predecessors'
		else if (e.key === 'H' && hasCommandModifier(e) ) return 'find-holonyms'
		else if (e.key === 'h' && e.altKey ) return 'find-homophones'
		else if (e.key === 'H' && e.altKey ) return 'find-hypernyms'
		else if (e.key === 'h' && hasCommandModifier(e) ) return 'find-hyponyms'
		else if (e.key === 'I' && hasCommandModifier(e) ) return 'find-information'
		else if (e.key === 'm' && hasCommandModifier(e) ) return 'find-meronyms'
		else if (e.key === 'n' && e.altKey ) return 'find-nouns'
		else if (e.key === 'p' && e.altKey ) return 'find-prefix-hints'
		else if (e.key === 'P' && e.altKey ) return 'find-portmanteaus'
		else if (e.key === 'r' && hasCommandModifier(e) ) return 'find-rhymes'
		else if (e.key === 'R' && hasCommandModifier(e) ) return 'find-advance-rhymes'
		else if (e.key === 'S' && hasCommandModifier(e) ) return 'find-similar'
		else if (e.key === 's' && e.altKey ) return 'find-similar-sound'
		else if (e.key === 'S' && e.altKey ) return 'find-similar-start'
		else if (e.key === 'T' && e.altKey ) return 'find-triggers'
		else if (e.key === 'v' && e.altKey) return 'replace'
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
		var Selected = this.props.selectedText
		if (Selected === undefined){
			alert('Nothing Selected')
			return 'not-handled'
		}
		if (Selected.trim().split(' ').length > 1 && query !== "Spelt Similar") {
			alert('Please select only one word to search ' + query + ' for!')
			return "handled"
		}
		if (query === 'Definitions')
			this.props.onDefChange(command, Selected)
		else 
			this.props.onSearch(command, Selected)
		this.props.onChange(query)
		return "handled"
	}

	handleCommandNoVal = (command, data, query) => {
		this.props.onSearch(command, data)
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
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

		if (command === 'find-antonyms') 
			this.handleCommand('findAntonyms', 'Antonyms')

		if (command === 'find-adjectives')
			this.handleCommand('findAdjectives', 'Adjectives')

		if (command === 'find-approximate-rhymes') 
			this.handleCommand('findApproximateRhymes', 'Approximate Rhymes')

		if (command === 'find-consonant-match')
			this.handleCommand('findConsonantMatch', 'Consonant Match')

		if (command === 'find-definitions')
			this.handleCommand('findDefinitions', 'Definitions')

		if (command === 'find-frequent-follower')
			this.handleCommand('findFrequentFollower', 'Frequent Followers')

		if (command === 'find-hyponyms')
			this.handleCommand('findHyponyms', 'Hyponyms')

		if (command === 'find-frequent-predecessors')
			this.handleCommand('findFrequentPredecessors', 'Frequent Predecessors')

		if (command === 'find-holonyms')
			this.handleCommand('findHolonyms', 'Holonyms')

		if (command === 'find-homophones')
			this.handleCommand('findHomophones', 'Homophones')

		if (command === 'find-hypernyms')
			this.handleCommand('findHypernyms', 'Hypernyms')

		if (command === 'find-information')
			this.handleCommand('findWordInformation', 'Information')

		if (command === 'find-meronyms')
			this.handleCommand('findMeronyms', 'Meronyms')

		if (command === 'find-nouns')
			this.handleCommand('findNouns', 'Nouns')

		if (command === 'find-portmanteaus')
			this.handleCommand('findPortmanteaus', 'Portmanteaus')

		if (command === 'find-prefix-hints')
			this.handleCommand('prefixHintSuggestions', 'Prefix Hints')

		if (command === 'find-rhymes')
			this.handleCommand('findRhymes', 'Rhymes')

		if (command === 'find-advance-rhymes')
			this.handleCommand('findRhymesAdvance', 'Advance Rhymes')

		if (command === 'find-similar')
			this.handleCommand('findSimilar', 'Similar Words')

		if (command === 'find-similar-sound')
			this.handleCommand('soundsSimilar', 'Similar Sounding Words')

		if (command === 'find-spelt-similar')
			this.handleCommand('speltSimilar', 'Spelt Similar')

		if (command === 'find-similar-start')
			this.setOpenStart(true)

		if (command === 'find-similar-end')
			this.setOpenEnd(true)

		if (command === 'find-similar-start-end')
			this.setOpenStartEnd(true)

		if (command === 'find-triggers')
			this.handleCommand('findTriggers', 'Triggers')

		if (command === 'replace')
			this.replace(this.props.reptext)

		if (newState) {
			this.onChange(newState);
			return 'handled'
		}

		this.props.setButtonCommand('')
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
						style={{ backgroundColor: '#f6f6f6' }}
						variant="contained"
						size="small"
					>U</Button>
					<Button
						onClick={this.onBoldClick}
						variant="contained"
						style={{ backgroundColor: '#f6f6f6' }}
						size="small"
					>
						<b>B</b>
					</Button>
					<Button
						onClick={this.onItalicClick}
						variant="contained"
						style={{ backgroundColor: '#f6f6f6' }}
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
				<SimilarWordStart 
					open = {this.state.openStart}
					setOpen = {this.setOpenStart}
					handleCommand = {this.handleCommandNoVal}
				/>
				<SimilarWordEnd 
					open = {this.state.openEnd}
					setOpen = {this.setOpenEnd}
					handleCommand = {this.handleCommandNoVal}
				/>
				<SimilarWordStartEnd 
					open = {this.state.openStartEnd}
					setOpen = {this.setOpenStartEnd}
					handleCommand = {this.handleCommandNoVal}
				/>
			</div>
		)
	}
}

export default PageContainer;
