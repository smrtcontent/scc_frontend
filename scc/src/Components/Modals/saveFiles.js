import { React, useState, useEffect } from "react";
import { Button, Snackbar } from "@material-ui/core";
import {
  Modal,
  TextField,
  Backdrop,
  Fade,
  makeStyles,
  Box,
} from "@material-ui/core/";
import save from "./../../features/Save/save";
import customButton from "./../../app/themes/customButton";
import ErrorAlert from "./../Alerts/errorAlert";
import Success from "../Alerts/success";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "25vw",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SaveFiles = (props) => {
  const classes = useStyles();
  const customButtons = customButton();
  const [openS, setOpenS] = useState(false);
  const [ErrMsg, setErrMsg] = useState("");
  const [Disable, setDisable] = useState(true);

  useEffect(() => Validation());

  const Validation = () => {
    if (props.name === undefined) {
      setErrMsg("");
      return true;
    } else if (props.name === "") {
      setErrMsg("Please Enter a file name");
      setDisable(true);
      return true;
    } else if (/^[\d]+/.test(props.name)) {
      setErrMsg("File name can not start with a digit");
      setDisable(true);
      return true;
    } else if (!/^[a-zA-Z_]+\d*$/.test(props.name)) {
      setErrMsg("File name can only contain either alphabets or '_'");
      setDisable(true);
      return true;
    } else {
      setErrMsg("");
    }
    setDisable(false);
  };

  const handleClose = () => props.setOpen(false);

  const handleSearch = (e) => {
    if (props.name === "") {
      alert("Please Enter a file name!");
      return;
    }
    save(props.content, props.name, setOpenS);
    props.setSaved(true);
    props.setOpen(false);
    e.preventDefault();
  };

  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
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
              <h4 id="transition-modal-title">Save File</h4>
              {ErrMsg.length > 1 ? <ErrorAlert message={ErrMsg} /> : <></>}
              <form
                id="transition-modal-description"
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSearch}
              >
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="File Name"
                  className="mt-2"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  autoFocus
                />
                <Box align="center" className="mt-2">
                  {Disable ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      className={customButtons.center}
                      disabled
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={customButtons.center}
                    >
                      Save
                    </Button>
                  )}
                </Box>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
      <div>
      <Snackbar
        open={openS}
        autoHideDuration={6000}
        onClose={() => setOpenS(false)}
      >
        <Success
          open={openS}
          setOpen={setOpenS}
          message={"The file has been saved successfully !"}
        />
      </Snackbar>
      </div>
    </>
  );
};

export default SaveFiles;
