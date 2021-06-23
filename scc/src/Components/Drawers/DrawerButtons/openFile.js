import React, { useState } from "react";
import { withStyles, ListItem, makeStyles, Tooltip } from "@material-ui/core/";
import NoteAddIcon from "@material-ui/icons/OpenInNew";
import { indigo } from "@material-ui/core/colors";
import OpenFiles from "./../../Modals/openFiles";
import AlertDialog from "../../Prompts/savePrompt";

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

const OpenFile = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // Hook to toggle the modal
  const [files, setFiles] = useState([]); // Hook to store fetched file names
  const [error, setError] = useState(false); // Hook to store if there is an error
  // const [agree, setAgree] = useState(false); // Hook to store if the user agrees to overwrite

  /**
   * Method to fetch file names from the database
   */
  const fetchFiles = () => {
    const URL = "http://localhost:8088/scc/api/getFileByUserId?userId=34";
    fetch(URL)
      .then((res) => res.json())
      .then((result) => {
        setFiles(result);
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    const empty = props.content === undefined || /^\s*$/.test(props.content);
    if (!props.saved) {
      if (!empty) {
        setError(true);
      } else {
        fetchFiles();
        setOpen(true);
      }
    } else {
      fetchFiles();
      setOpen(true);
    }
  };

  const handleAgree = () => {
    setError(false);
    fetchFiles();
    setOpen(true);
  };

  return (
    <div>
      <ListItems button onClick={handleOpen}>
        <span className={classes.itemIcon}>
          {props.open ? (
            <NoteAddIcon color="secondary" />
          ) : (
            <Tooltip title="Open a file" placement="right" arrow>
              <NoteAddIcon color="secondary" />
            </Tooltip>
          )}
        </span>
        <span className={classes.itemText}>Open File</span>
      </ListItems>
      {error ? (
        <AlertDialog
          open={error}
          handleAgree={handleAgree}
          setOpen={setError}
        />
      ) : (
        <OpenFiles
          open={open}
          setOpen={setOpen}
          files={files}
          setOpenFileContent={props.setOpenFileContent}
          setSaved={props.setSaved}
          setFileId={props.setFileId}
          setName={props.setName}
        />
      )}
    </div>
  );
};

export default OpenFile;
