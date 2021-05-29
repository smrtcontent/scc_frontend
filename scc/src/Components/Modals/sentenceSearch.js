import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Box,
  Button,
  Snackbar,
} from "@material-ui/core";
import customButton from "./../../app/themes/customButton";
import ErrorAlert from "./../Alerts/errorAlert";
import Error from "./../Alerts/error";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
  },
  modal: {
    userSelect: "none",
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

const SentenceSearch = (props) => {
  const classes = useStyles();
  const [syllable, setSyllable] = useState();
  const [selected, setSelected] = useState();
  const [ErrMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [Disable, setDisable] = useState(true);

  const handleClose = () => props.setOpen(false);
  const handleChange = (e) => setSyllable(e.target.value);
  const handleChangeSelected = (e) => setSelected(e.target.value);

  useEffect(() => Validation());

  const Validation = () => {
    if(props.selected === undefined) {
      if (selected === undefined) {
        setErrMsg("");
        return true;
      } else if (selected === "") {
        setErrMsg("Please Enter a Word");
        setDisable(true);
        return true;
      } else if (!/^[a-zA-Z]+\s*$/.test(selected)) {
        setErrMsg("Please enter a valid English Word");
        setDisable(true);
        return true;
      } else {
        setErrMsg("");
      }
    }
    if (syllable === undefined) {
      setErrMsg("");
      return true;
    } else if (syllable === "") {
      setErrMsg("Please Enter Number of syllables");
      setDisable(true);
      return true;
    } else if (!/^[0-9]+\s*$/.test(syllable)) {
      setErrMsg("Please enter a valid Number");
      setDisable(true);
      return true;
    } else {
      setErrMsg("");
    } 
    setDisable(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const data = [syllable.trim(), props.selected.trim()];
    setSyllable(undefined);
    setErrMsg("");
    setDisable(true);
    handleClose();
    props.handleCommand("getSentencesByWordAndSyllable", data, "Sentences");
  };

  return (
    <div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Error open={error} setOpen={setError} message={ErrMsg} />
      </Snackbar>
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
            <h2 id="transition-modal-title">Sentence Search </h2>
            {ErrMsg.length > 1 ? <ErrorAlert message={ErrMsg} /> : <></>}
            <form
              id="transition-modal-description"
              className={classes.root}
              onSubmit={handleSearch}
              noValidate
              autoComplete="off"
            >
              {props.selected === undefined ? (
                <TextField
                  id="standard-basic"
                  label="Word"
                  value={selected}
                  onChange={handleChangeSelected}
                  fullWidth
                  autoFocus
                />
              ) : (
                <></>
              )}
              {props.selected === undefined ? (
                <TextField
                  id="standard-basic"
                  label="Syllables"
                  value={syllable}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                <TextField
                  id="standard-basic"
                  label="Syllables"
                  value={syllable}
                  onChange={handleChange}
                  fullWidth
                  autoFocus
                />
              )}
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

export default SentenceSearch;
