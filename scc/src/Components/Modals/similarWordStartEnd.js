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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 3,
  },
}));

const SimilarWordStartEnd = (props) => {
  const classes = useStyles();
  const [startLetter, setStartLetter] = useState();
  const [endLetter, setEndLetter] = useState();
  const [ErrMsg, setErrMsg] = useState("");
  const [Disable, setDisable] = useState(true);

  const handleClose = () => props.setOpen(false);
  const handleChangeL = (e) => setStartLetter(e.target.value);
  const handleChangeW = (e) => setEndLetter(e.target.value);

  useEffect(() => Validation());

  const Validation = () => {
    if (startLetter === undefined) {
      return true;
    } else if (startLetter === "") {
      setErrMsg("Please Enter a letter");
      setDisable(true);
      return true;
    } else if (!/^[a-zA-Z]\s*$/.test(startLetter)) {
      setErrMsg("Please Enter a valid English Alphabet");
      setDisable(true);
      return true;
    } else if (endLetter === undefined) {
      setErrMsg("");
      return true;
    } else if (endLetter === "") {
      setErrMsg("Please Enter a letter");
      setDisable(true);
      return true;
    } else if (!/^[a-zA-Z]\s*$/.test(endLetter)) {
      setErrMsg("Please enter a valid English Alphabet");
      setDisable(true);
      return true;
    } else {
      setErrMsg("");
    }
    setDisable(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const data = [startLetter.trim(), endLetter.trim()];
    props.handleCommand(
      "wordsStartingWithEndingWith",
      data,
      "Words starting and ending with specific letters"
    );
    setStartLetter("");
    setEndLetter("");
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
          timeout: 1000,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Similar word search </h2>
            {ErrMsg.length > 1 ? <ErrorAlert message={ErrMsg} /> : <></>}
            <form
              id="transition-modal-description"
              className={classes.root}
              onSubmit={handleSearch}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Start Letter"
                fullWidth
                value={startLetter}
                onChange={handleChangeL}
                autoFocus
              />
              <br />
              <TextField
                id="standard-basic"
                label="End Letter"
                fullWidth
                value={endLetter}
                onChange={handleChangeW}
              />
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

export default SimilarWordStartEnd;
