import React, { useState } from "react";
import { withStyles, ListItem, makeStyles, Tooltip } from "@material-ui/core/";
// import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { indigo } from "@material-ui/core/colors";
import AlertDialog from "../../Prompts/savePrompt";

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

const NewFile = (props) => {
  const classes = useStyles();
  const [error, setError] = useState();

  const handleAdd = () => {
    const empty = props.content === undefined || /^\s*$/.test(props.content);
    if (!props.saved) {
      if (!empty) {
        setError(true);
      }
    } else {
      setError(false);
      props.setNewFile(true);
      props.setName();
      props.setSaved(false);
      props.setOpenFileContent();
    }
  };

  const handleAgree = () => {
    setError(false);
    props.setNewFile(true);
    props.setName();
    props.setSaved(false);
    props.setOpenFileContent();
  };

  return (
    <div>
      <ListItems button onClick={handleAdd}>
        <span className={classes.itemIcon}>
          {props.open ? (
            <AddCircleIcon color="secondary" />
          ) : (
            <Tooltip title="Create a new file" arrow>
              <AddCircleIcon color="secondary" />
            </Tooltip>
          )}
        </span>
        <span className={classes.itemText}>New File</span>
      </ListItems>
      <AlertDialog open={error} handleAgree={handleAgree} setOpen={setError} />
    </div>
  );
};

export default NewFile;
