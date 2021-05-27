import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  Modal,
  withStyles,
  Backdrop,
  Fade,
  makeStyles,
} from "@material-ui/core/";
import DescriptionIcon from "@material-ui/icons/Description";
import { indigo } from "@material-ui/core/colors";
import Open from "./../../features/Open/open";
import Success from "../Alerts/success";
import Error from "../Alerts/error";

const ListItems = withStyles({
  root: {
    "&$selected": {
      backgroundColor: indigo[500],
      color: "white",
    },
    "&:hover": {
      backgroundColor: indigo[100],
      backdropFilter: "blur(1px)",
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
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(2px)",
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "90%",
    width: "90%",
    borderRadius: "3px",
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

const OpenFiles = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // Hook to store and toggle the success alert
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
              <List>
                {props.files.map((x, index) => (
                  <>
                    <ListItems
                      button
                      className={classes.itemText}
                      style={{ color: "black" }}
                      key={index}
                      onClick={() => {
                        Open(
                          x.fileName,
                          props.setOpenFileContent,
                          props.setName,
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
                    <Divider
                      flexItem
                      variant="fullWidth"
                      style={{ backgroundColor: "black" }}
                    />
                  </>
                ))}
              </List>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
      <Snackbar
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
