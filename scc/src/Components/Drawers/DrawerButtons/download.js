import { React, useState } from "react";
import {
  withStyles,
  ListItem,
  makeStyles,
} from "@material-ui/core/";
import { indigo } from "@material-ui/core/colors";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SuccessSnackbar from "./../../Modals/successSnackbar";
import saveAsDoc from "./../../../features/Save/saveAsDoc"
import Tooltip from '@material-ui/core/Tooltip';

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
  const [openS, setOpenS] = useState()
  
  const handleDownload = () => {
    if(props.content!=='' && props.content!==undefined) {
      if(props.name!==undefined)
        saveAsDoc(props.content,props.name)
      else 
        saveAsDoc(props.content)
      setOpenS(true)
    }
  }   

  return (
    <>
      <ListItems button onClick={handleDownload}>
        <span className={classes.itemIcon}>
          {(props.open)? 
            <SaveAltIcon color="secondary" />
            :
            <Tooltip title="Download as DOC" arrow> 
              <SaveAltIcon color="secondary" />
            </Tooltip>
          }
        </span>
        <span className={classes.itemText}>Download</span>
      </ListItems>
      <SuccessSnackbar
        show={openS}
        setShow={setOpenS}
        message={"The selected file has been downloaded successfully !"}
      />
    </>
  );
};

export default Download;
