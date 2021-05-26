import React from "react";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessAlert = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setShow(false);
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
          severity="warning"
        >
          {props.message}
        </Alert>
      </Collapse>
    </div>
    // <>
    //     <Snackbar open={props.show} autoHideDuration={6000} onClose={handleClose}>
    //         <Alert onClose={handleClose} severity="success">
    //             {props.message}
    //         </Alert>
    //     </Snackbar>
    // </>
  );
};
export default SuccessAlert;
