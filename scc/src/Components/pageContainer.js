import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Button } from '@material-ui/core'

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty()
		};
	}

	onChange = editorState => {
		this.setState({
			editorState
		});
	};

	handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.onChange(newState);
			return "handled";
		}
		return "not-handled";
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
				<Button 
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
				</Button>
				<div className="editors">
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
					/>
				</div>
			</div>
		);
	}
}

export default PageContainer;
