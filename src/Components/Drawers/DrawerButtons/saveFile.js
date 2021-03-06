import { React, useState, useEffect } from "react";
import { Button, Tooltip } from "@material-ui/core";
import {
  Modal,
  TextField,
  withStyles,
  ListItem,
  Backdrop,
  Fade,
  makeStyles,
  Box,
  Snackbar,
} from "@material-ui/core/";
import { indigo } from "@material-ui/core/colors";
import SaveIcon from "@material-ui/icons/Save";
import save from "./../../../features/Save/save";
import customButton from "./../../../app/themes/customButton";
import ErrorAlert from "./../../Alerts/errorAlert";
import Success from "../../Alerts/success";
import updateFile from "../../../features/Update/updateFile";
import Error from "../../Alerts/error";

const ListItems = withStyles({
  root: {
    "&$selected": {
      backgroundColor: indigo[500],
      color: "white",
    },
    "&:hover": {
      backgroundColor: indigo[100],
    },
  },
  selected: {},
})(ListItem);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  itemIcon: {
    margin: theme.spacing(0, 2, 0, 0),
    color: "secondary",
    fontWeight: 100,
    height: "18px",
    width: "auto",
  },

  itemText: {
    color: "#141414",
    fontSize: "0.80rem",
    paddingTop: "8px",
  },
}));

const SaveFile = (props) => {
  const classes = useStyles();
  const customButtons = customButton();
  const [open, setOpen] = useState(false);
  const [openU, setOpenU] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disable, setDisable] = useState(true);

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

  const handleOpen = () => {
    if (/^\s*$/.test(props.content)) {
      setMessage("There is no content to save!");
      setError(true);
    } else if (!props.saved) setOpen(true);
    else {
      updateFile(props.content, props.name, setOpenU, props.fileId);
      props.setSaved(true);
    }
  };

  const handleCloseModal = () => setOpen(false);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    handleSave();
    // setOpenS(true);
    handleCloseModal();
    e.preventDefault();
  };

  const handleSave = () => {
    if (props.name === "") {
      setMessage("Please Enter a file name!");
      setError(true);
      return;
    }
    save(props.setFileId, props.content, props.name, setOpenS,setError,setMessage);
    props.setSaved(true);

  };

  return (
    <>
      <ListItems button onClick={handleOpen}>
        <span className={classes.itemIcon}>
          {props.open ? (
            <SaveIcon color="secondary" />
          ) : (
            <Tooltip title="Save current content" placement="right" arrow>
              <SaveIcon color="secondary" />
            </Tooltip>
          )}
        </span>
        <span className={classes.itemText}>Save File</span>
      </ListItems>
      {!props.saved ? (
        <div>
          {props.content === undefined || /^\s*$/.test(props.content) ? (
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={error}
              autoHideDuration={6000}
              onClose={() => setError(false)}
              key={"bottomright"}
            >
              <Error open={error} setOpen={setError} message={message} />
            </Snackbar>
          ) : (
            <Modal
              aria-labelledby="transition-modal-title"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h4 id="transition-modal-title">Save File</h4>
                  {errMsg.length > 1 ? <ErrorAlert message={errMsg} /> : <></>}
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
                      {disable ? (
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
          )}
        </div>
      ) : (
        <div></div>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openU}
        autoHideDuration={6000}
        onClose={() => setOpenU(false)}
      >
        <Success
          open={openU}
          setOpen={setOpenU}
          message={"The file has been updated successfully !"}
        />
      </Snackbar>
      <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={error}
              autoHideDuration={6000}
              onClose={() => setError(false)}
              key={"bottomright"}
            >
              <Error open={error} setOpen={setError} message={message} />
      </Snackbar>
    </>
  );
};

export default SaveFile;
