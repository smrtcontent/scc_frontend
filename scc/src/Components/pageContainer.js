import React from "react";
import getFragmentFromSelection from "draft-js/lib/getFragmentFromSelection";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";
import SimilarWordEnd from "./Modals/similarWordEnd";
import SimilarWordStart from "./Modals/similarWordStart";
import SimilarWordStartEnd from "./Modals/similarWordStartEnd";
import DualRhymes from "./Modals/dualRhymes";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import SaveFiles from "./Modals/saveFiles";
import SuccessSnackbar from "./Modals/successSnackbar";
import save from "../features/Save/save";
import { isMobile } from "react-device-detect";
import SentenceSearch from "./Modals/sentenceSearch";
import SentenceSearchSRW from "./Modals/sentenceSearchSRW";

const { hasCommandModifier } = KeyBindingUtil;

class PageContainer extends React.Component {
  setFocus = () => {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState),
    });
  };

  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.state = {
      editorState: EditorState.createEmpty(),
      selected: "",
      show: true,
      open: false,
      openS: false,
      openEnd: false,
      openStart: false,
      openStartEnd: false,
      openDualRhymesSearch: false,
      openSentenceSearch: false,
      openSentenceSearchSRW: false,
    };
    props.changeFun(() => this.setFocus);
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState),
    });

    /**
     * This function is to set the selected text in the selected state
     */
    this.onSearch = (selectedText) => {
      this.setState({ selected: selectedText });
      this.props.onSearch(selectedText);
    };

    /**
     * This function updates the editorState
     *
     * @param {*} editorState
     * @returns {void}
     */
    this.onChange = (editorState) => this.setState({ editorState });
  }

  componentDidUpdate() {
    const selected = getFragmentFromSelection(this.state.editorState);
    var Selected = selected ? selected.map((x) => x.getText()).join("\n") : "";
    if (Selected !== "") this.props.setSelectedText(Selected);
    if (this.props.buttonCommand !== undefined)
      this.handleKeyCommand(this.props.buttonCommand);
    if (this.state.editorState !== undefined)
      this.props.setContent(
        this.state.editorState.getCurrentContent().getPlainText()
      );
    if (this.props.openFileContent !== "") {
      this.handleNewFile(this.props.openFileContent);
      this.props.setOpenFileContent("");
    }
  }

  setShow = (e) => this.setState({ show: e });
  setOpen = (e) => this.setState({ open: e });
  setOpenS = (e) => this.setState({ openS: e });
  setOpenEnd = (e) => this.setState({ openEnd: e });
  setOpenStart = (e) => this.setState({ openStart: e });
  setOpenStartEnd = (e) => this.setState({ openStartEnd: e });
  setOpenSentenceSearch = (e) => this.setState({ openSentenceSearch: e });
  setOpenDualRhymesSearch = (e) => this.setState({ openDualRhymesSearch: e });
  setOpenSentenceSearchSRW = (e) => this.setState({ openSentenceSearchSRW: e });

  setFocus = () => {
    this.setState({
      editorState: EditorState.moveFocusToEnd(this.state.editorState),
    });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    this.setOpenWarningAlert(false);
  };

  handleNewFile = (content) => {
    let selection = undefined;

    let currentContent = this.state.editorState.getCurrentContent();
    selection = this.state.editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      anchorOffset: 0,

      focusOffset: currentContent.getLastBlock().getText().length,
      focusKey: currentContent.getLastBlock().getKey(),
      hasFocus: true,
    });

    const newContent = Modifier.replaceText(
      this.state.editorState.getCurrentContent(),
      selection,
      content
    );

    const newEditorState = EditorState.push(
      this.state.editorState,
      newContent,
      "insert-characters"
    );
    this.setState({ editorState: newEditorState });
    return true;
  };

  /**
   * Gets the current Editor State and the character to insert and then inserts
   * the character in the editorState
   *
   */
  insertCharacter = (characterToInsert, editorState) => {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      characterToInsert
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );

    return newEditorState;
  };

  /**
   * Function that calls the insertCharacter function and then pushes the new state in the
   * setState function which in turn sets the new state of the editor.
   */
  replace = (e) => {
    const newEditorState = this.insertCharacter(e, this.state.editorState);
    this.setState({
      editorState: newEditorState,
    });
  };

  /**
   * Checks and returns the command for the text editor
   *
   */
  suggestionsKeyBinding = (e) => {
    if (e.key === "a" && e.altKey) return "find-antonyms";
    else if (e.key === "A" && hasCommandModifier(e)) return "find-adjectives";
    else if (e.key === "A" && e.altKey) return "find-approximate-rhymes";
    else if (e.key === "C" && hasCommandModifier(e))
      return "find-consonant-match";
    else if (e.key === "c" && e.altKey) return "find-sentences";
    else if (e.key === "C" && e.altKey) return "find-sentences-syllable";
    
    else if (e.key === "d" && hasCommandModifier(e)) return "find-definitions";
    else if (e.key === "D" && e.altKey) return "find-spelt-similar";
    else if (e.key === "e" && hasCommandModifier(e)) return "find-similar-end";
    else if (e.key === "E" && hasCommandModifier(e))
      return "find-similar-start-end";
    else if (e.key === "F" && hasCommandModifier(e))
      return "find-frequent-follower";
    else if (e.key === "f" && e.ctrlKey && e.altKey)
      return "find-frequent-predecessors";
    else if (e.key === "g" && hasCommandModifier(e))
      return "find-sentences-srw";
    else if (e.key === "H" && hasCommandModifier(e)) return "find-holonyms";
    else if (e.key === "h" && e.altKey) return "find-homophones";
    else if (e.key === "H" && e.altKey) return "find-hypernyms";
    else if (e.key === "h" && hasCommandModifier(e)) return "find-hyponyms";
    else if (e.key === "I" && hasCommandModifier(e)) return "find-information";
    else if (e.key === "m" && hasCommandModifier(e)) return "find-meronyms";
    else if (e.key === "n" && e.altKey) return "find-nouns";
    else if (e.key === "N" && e.altKey) return "save-file";
    else if (e.key === "p" && e.altKey) return "find-prefix-hints";
    else if (e.key === "P" && e.altKey) return "find-portmanteaus";
    else if (e.key === "r" && hasCommandModifier(e)) return "find-rhymes";
    else if (e.key === "R" && hasCommandModifier(e))
      return "find-advance-rhymes";
    else if (e.key === "r" && e.altKey) return "find-dual-rhymes";
    else if (e.key === "R" && e.altKey) return "find-dual-Rhymes";
    else if (e.key === "S" && hasCommandModifier(e)) return "find-similar";
    else if (e.key === "s" && e.altKey) return "find-similar-sound";
    else if (e.key === "S" && e.altKey) return "find-similar-start";
    else if (e.key === "T" && e.altKey) return "find-triggers";
    else if (e.key === "v" && e.altKey) return "replace";
    return getDefaultKeyBinding(e);
  };

  /**
   * Handles the shortcut commands and updates the parent states
   *
   */
  handleCommand = (command, query) => {
    this.props.setIsLoading(true);
    var Selected = this.props.selectedText;
    if (Selected === undefined || Selected.trim() === "") {
      this.props.setWarningMessage(
        "Please select a word before making query search!"
      );
      this.props.setOpenWarningAlert(true);
      this.props.setIsLoading(false);
      return "handled";
    }
    if (
      Selected.trim().split(" ").length > 1 &&
      query !== "Spelt Similar" &&
      query !== "Dual Rhymes"
    ) {
      this.props.setWarningMessage(
        "Please select exactly one word to search " + query + " for!"
      );
      this.props.setOpenWarningAlert(true);
      this.props.setIsLoading(false);
      return "handled";
    }
    if (query === "Definitions") this.props.onDefChange(command, Selected);
    else this.props.onSearch(command, Selected);
    this.props.onChange(query);
    this.props.setSelectedText();
    return "handled";
  };

  // Handles the commands with no validation check for one word exact
  handleCommandNoVal = (command, data, query) => {
    this.props.setIsLoading(true);
    this.props.onSearch(command, data);
    this.props.onChange(query);
    this.props.setSelectedText();
    return "handled";
  };

  // Handles the saving of file in the database
  handleSave = () => {
    if (!this.props.saved) {
      this.setOpenS(true);
      this.setOpen(true);
    } else {
      save(
        this.state.editorState.getCurrentContent().getPlainText(),
        this.props.name,
        this.setShow
      );
      this.showSnacks = () => {
        return (
          <SuccessSnackbar
            show={this.state.show}
            setShow={this.setShow}
            message={"File has been save successfully!"}
          />
        );
      };
    }
  };

  // Empty function to hold the snackbar return from handleSave()
  showSnacks = () => {};

  // Returns the modal to enable saving file
  save = (state = false) => {
    if (state) {
      return (
        <SaveFiles
          saved={this.props.saved}
          open={this.state.open}
          openS={this.state.openS}
          name={this.props.name}
          content={this.state.editorState.getCurrentContent().getPlainText()}
          setOpen={this.setOpen}
          setOpenS={this.setOpenS}
          setSaved={this.props.setSaved}
          setName={this.props.setName}
        />
      );
    } else return <></>;
  };

  /**
   * Handles the input command given to the editor and maps it to the specific
   * function and sets the state of selection at textEditor.js
   */
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (command === "find-antonyms")
      this.handleCommand("findAntonyms", "Antonyms");

    if (command === "find-adjectives")
      this.handleCommand("findAdjectives", "Adjectives");

    if (command === "find-approximate-rhymes")
      this.handleCommand("findApproximateRhymes", "Approximate Rhymes");

    if (command === "find-consonant-match")
      this.handleCommand("findConsonantMatch", "Consonant Match");

    if (command === "find-definitions")
      this.handleCommand("findDefinitions", "Definitions");

    if (command === "find-frequent-follower")
      this.handleCommand("findFrequentFollower", "Frequent Followers");

    if (command === "find-hyponyms")
      this.handleCommand("findHyponyms", "Hyponyms");

    if (command === "find-frequent-predecessors")
      this.handleCommand("findFrequentPredecessors", "Frequent Predecessors");

    if (command === "find-holonyms")
      this.handleCommand("findHolonyms", "Holonyms");

    if (command === "find-homophones")
      this.handleCommand("findHomophones", "Homophones");

    if (command === "find-hypernyms")
      this.handleCommand("findHypernyms", "Hypernyms");

    if (command === "find-information")
      this.handleCommand("findWordInformation", "Information");

    if (command === "find-meronyms")
      this.handleCommand("findMeronyms", "Meronyms");

    if (command === "find-nouns") this.handleCommand("findNouns", "Nouns");

    if (command === "find-portmanteaus")
      this.handleCommand("findPortmanteaus", "Portmanteaus");

    if (command === "find-prefix-hints")
      this.handleCommand("prefixHintSuggestions", "Prefix Hints");

    if (command === "find-rhymes") this.handleCommand("findRhymes", "Rhymes");

    if (command === "find-advance-rhymes")
      this.handleCommand("findRhymesAdvance", "Advance Rhymes");

    if (command === "find-dual-rhymes")
      this.handleCommand("findDualRhymes", "Dual Rhymes");

    if (command === "find-dual-Rhymes") this.setOpenDualRhymesSearch(true);

    if (command === "find-similar")
      this.handleCommand("findSimilar", "Similar Words");

    if (command === "find-similar-sound")
      this.handleCommand("soundsSimilar", "Similar Sounding Words");

    if (command === "find-spelt-similar")
      this.handleCommand("speltSimilar", "Spelt Similar");

    if (command === "find-sentences")
      this.handleCommand("getSentencesByWord", "Sentences");

    if (command === "find-sentences-syllable") this.setOpenSentenceSearch(true);

    if (command === "find-sentences-srw") this.setOpenSentenceSearchSRW(true);

    if (command === "find-similar-start") this.setOpenStart(true);

    if (command === "find-similar-end") this.setOpenEnd(true);

    if (command === "find-similar-start-end") this.setOpenStartEnd(true);

    if (command === "find-triggers")
      this.handleCommand("findTriggers", "Triggers");

    if (command === "replace") this.replace(this.props.reptext);

    if (command === "save-file") this.handleSave();

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    this.props.setButtonCommand("");
    return "not-handled";
  };

  /**
   * The formatting options
   */

  onUnderlineClick = () =>
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );

  onBoldClick = () =>
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));

  onItalicClick = () =>
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );

  render() {
    return (
      <div className="editorContainer">
        {this.save(this.state.openS)}
        <>{this.showSnacks()}</>
        <Box display="flex" justifyContent="center">
          <Box display="flex" justifyItems="center" flexGrow={1}>
            <ButtonGroup>
              <Button
                onClick={this.onUnderlineClick}
                style={{ backgroundColor: "#f6f6f6" }}
                variant="contained"
                size="small"
              >
                U
              </Button>
              <Button
                onClick={this.onBoldClick}
                variant="contained"
                style={{ backgroundColor: "#f6f6f6" }}
                size="small"
              >
                <b>B</b>
              </Button>
              <Button
                onClick={this.onItalicClick}
                variant="contained"
                style={{ backgroundColor: "#f6f6f6" }}
                size="small"
              >
                <em>I</em>
              </Button>
            </ButtonGroup>
          </Box>
          {isMobile && this.props.reptext !== undefined ? (
            <Box justifyItems="end">
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  this.setFocus();
                  this.replace(this.props.reptext);
                }}
              >
                Paste
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.suggestionsKeyBinding}
            onChange={this.onChange}
            spellCheck
            placeholder="Begin typing here..."
          />
        </div>
        <SimilarWordStart
          open={this.state.openStart}
          setOpen={this.setOpenStart}
          handleCommand={this.handleCommandNoVal}
        />
        <SimilarWordEnd
          open={this.state.openEnd}
          setOpen={this.setOpenEnd}
          handleCommand={this.handleCommandNoVal}
        />
        <SimilarWordStartEnd
          open={this.state.openStartEnd}
          setOpen={this.setOpenStartEnd}
          handleCommand={this.handleCommandNoVal}
        />
        <DualRhymes
          open={this.state.openDualRhymesSearch}
          setOpen={this.setOpenDualRhymesSearch}
          handleCommand={this.handleCommandNoVal}
        />
        <SentenceSearch
          open={this.state.openSentenceSearch}
          setOpen={this.setOpenSentenceSearch}
          handleCommand={this.handleCommandNoVal}
          selected={this.props.selectedText}
        />
        <SentenceSearchSRW 
          open={this.state.openSentenceSearchSRW}
          setOpen={this.setOpenSentenceSearchSRW}
          handleCommand={this.handleCommandNoVal}
          selected={this.props.selectedText}
        />
      </div>
    );
  }
}

export default PageContainer;
