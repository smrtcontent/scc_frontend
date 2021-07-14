import { React, useState } from "react";
import { withStyles, ListItem, makeStyles, Snackbar } from "@material-ui/core/";
import { indigo } from "@material-ui/core/colors";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import saveAsDoc from "./../../../features/Save/saveAsDoc";
import Tooltip from "@material-ui/core/Tooltip";
import Error from "../../Alerts/error";
import Success from "../../Alerts/success";

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
    width: "25vw",
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

const Download = (props) => {
  const classes = useStyles();
  const [openS, setOpenS] = useState(false); // Hook to store and toggle the success alert
  const [error, setError] = useState(false); // Hook to store and toggle the error alert

  /**
   *  The method will download the file if there is content in it or else will throw an error
   */
  const handleDownload = () => {
    if (props.content !== "" && props.content !== undefined) {
      if (props.name !== undefined) {
        console.log(props.name);
        saveAsDoc(props.content, props.name);
      } else saveAsDoc(props.content, "document");
      setOpenS(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Error
          open={error}
          setOpen={setError}
          message={"There is no content to download"}
        />
      </Snackbar>
      <ListItems button onClick={handleDownload}>
        <span className={classes.itemIcon}>
          {props.open ? (
            <SaveAltIcon color="secondary" />
          ) : (
            <Tooltip title="Download as DOC" placement="right" arrow>
              <SaveAltIcon color="secondary" />
            </Tooltip>
          )}
        </span>
        <span className={classes.itemText}>Download</span>
      </ListItems>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openS}
        autoHideDuration={6000}
        onClose={() => setOpenS(false)}
      >
        <Success
          open={openS}
          setOpen={setOpenS}
          message={"The file has been downloaded successfully !"}
        />
      </Snackbar>
    </>
  );
};

export default Download;
