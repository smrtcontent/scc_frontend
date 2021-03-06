import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import customButton from "./../../app/themes/customButton";
import ErrorAlert from "./../Alerts/errorAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 3,
  },
}));

const SimilarWord = (props) => {
  const classes = useStyles();
  const [Letter, setLetter] = useState();
  const [Word, setWord] = useState();
  const [ErrMsg, setErrMsg] = useState("");
  const [Disable, setDisable] = useState(true);

  const handleClose = () => props.setOpen(false);
  const handleChangeL = (e) => setLetter(e.target.value);
  const handleChangeW = (e) => setWord(e.target.value);

  useEffect(() => Validation());

  const Validation = () => {
    if (Letter === undefined) {
      return true;
    } else if (Letter === "") {
      setErrMsg("Please Enter a letter");
      setDisable(true);
      return true;
    } else if (!/^[a-zA-Z]\s*$/.test(Letter)) {
      setErrMsg("Please Enter a valid English Alphabet");
      setDisable(true);
      return true;
    } else {
      setErrMsg("");
    }

    if (props.selected === undefined) {
      
      if (Word === undefined) {
        setErrMsg("");
        return true;
      } else if (Word === "") {
        setErrMsg("Please Enter a Word");
        setDisable(true);
        return true;
      } else if (!/^[a-zA-Z]+\s*$/.test(Word)) {
        setErrMsg("Please enter a valid English Word");
        setDisable(true);
        return true;
      } else {
        setErrMsg("");
      }
    }
    setDisable(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const data = 
    (props.selected === undefined)?
    [Letter.trim(), Word.trim()]:
    [Letter.trim(), props.selected.trim()];
    // const data = [Letter, Word];
    props.handleCommand(
      "findSimilarStartsWith",
      data,
      "Words with similar starting"
    );
    setLetter(undefined);
    setWord(undefined);
    setErrMsg("");
    setDisable(true);
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Similar word search</h2>
            {ErrMsg.length > 1 ? <ErrorAlert message={ErrMsg} /> : <></>}
            <form
              id="transition-modal-description"
              className={classes.root}
              onSubmit={handleSearch}
              noValidate
              autoComplete="off"
            >
              {/* <TextField
                id="standard-basic"
                label="Starting Letter"
                value={Letter}
                onChange={handleChangeL}
                fullWidth
                autoFocus
              /> */}
               {props.selected === undefined ? (
                <TextField
                  id="standard-basic"
                  label="Starting Letter"
                  value={Letter}
                  onChange={handleChangeL}
                  fullWidth
                />
              ) : (
                <TextField
                  id="standard-basic"
                  label="Starting Letter"
                  value={Letter}
                  onChange={handleChangeL}
                  fullWidth
                  autoFocus
                />
              )}
              <br />
              {props.selected === undefined ? (
                <TextField
                  id="standard-basic"
                  label="Word"
                  value={Word}
                  onChange={handleChangeW}
                  fullWidth
                  // autoFocus
                />
              ) : (
                <></>
              )}
              {/* <TextField
                id="standard-basic"
                label="Word"
                value={Word}
                onChange={handleChangeW}
                fullWidth
              /> */}
              <Box align="center">
                {Disable ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={customButton().root}
                    disabled
                  >
                    Search
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={customButton().root}
                  >
                    Search
                  </Button>
                )}
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SimilarWord;
