import React from "react";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    fontSize: "95%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    // console.warn(props.message);
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Collapse in={props.open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity="error"
        >
            {props.message}
        </Alert>
      </Collapse>
    </div>
  );
};
export default Error;
