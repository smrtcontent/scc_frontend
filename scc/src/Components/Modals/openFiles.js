import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Snackbar,
  Typography,
  Tooltip,
  Box,
  Modal,
  withStyles,
  Backdrop,
  Fade,
  makeStyles,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import { indigo, red } from "@material-ui/core/colors";
import Open from "./../../features/Open/open";
import Success from "../Alerts/success";
import Error from "../Alerts/error";
import deleteFile from "../../features/Delete/deleteFile";

const ListItems = withStyles({
  root: {
    "&$selected": {
      backgroundColor: indigo[500],
      color: "white",
    },
    "&:hover": {
      backgroundColor: indigo[100],
      // backdropFilter: "blur(1px)",
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
    backgroundColor: "rgba(255,255,255,0.97)",
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90%",
    borderRadius: "3px",
  },

  list: {
    height: "65vh",
    overflowY: "scroll",
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

  button: {
    color: red[500],
    fontSize: "0.80rem",
    "&:hover": {
      backgroundColor: red[100],
      // backdropFilter: "blur(1px)",
    },
  },
}));

const OpenFiles = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // Hook to store and toggle the success alert
  const [openDelete, setOpenDelete] = useState(false); // Hook to store and toggle the deleted file alert
  const [error, setError] = useState(false); // Hook to store and toggle the error alert

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
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
          <Card className={classes.paper}>
            <CardContent>
              <Typography id="transition-modal-title" variant="h5">
                Please select the file of your choice
              </Typography>
              <List className={classes.list}>
                {props.files.map((x, index) =>
                  x.active ? (
                    <Box display="flex">
                      <ListItems
                        button
                        className={classes.itemText}
                        style={{ color: "black" }}
                        key={Math.random() * 100}
                        onClick={() => {
                          Open(
                            x.fileName,
                            props.setOpenFileContent,
                            props.setName,
                            props.setSaved,
                            props.setFileId,
                            setOpen,
                            setError
                          );
                          props.setOpen(false);
                        }}
                      >
                        <DescriptionIcon
                          className={classes.itemIcon}
                          color="primary"
                        />
                        {x.fileName}
                      </ListItems>
                      <Tooltip
                        title={`Delete the file ${x.fileName}`}
                        placement="left"
                        arrow
                      >
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            className={classes.button}
                            onClick={(e) => {
                              e.preventDefault();
                              deleteFile(setOpenDelete, x.id);
                              console.log("deleted " + x.fileName);
                              props.setOpen(false);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Tooltip>
                      <Divider
                        flexItem
                        variant="fullWidth"
                        style={{ backgroundColor: "black" }}
                      />
                    </Box>
                  ) : (
                    <></>
                  )
                )}
              </List>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Success
          open={open}
          setOpen={setOpen}
          message={"The selected file has been loaded successfully !"}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openDelete}
        autoHideDuration={6000}
        onClose={() => setOpenDelete(false)}
      >
        <Success
          open={openDelete}
          setOpen={setOpenDelete}
          message={"The selected file has been Deleted successfully !"}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Error
          open={error}
          setOpen={setError}
          message={"Sorry, the file could not be loaded!"}
        />
      </Snackbar>
    </>
  );
};

export default OpenFiles;
