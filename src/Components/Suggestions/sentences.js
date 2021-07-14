import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(0.5),
  },
}));

const Sentences = (props) => {
  const classes = useStyles();

  // This is the return module for the portmanteaus component
  // This will check if the props contain portmanteaus or not
  if (props.sentences.length > 0) {
    // This section will be returned only if the props contain Dual Rhymes
    return (
      <div id="scroll-blue" className="suggestions pl-2">
        {props.sentences.map((x, index) => (
          <Button
            key={index}
            size="small"
            className={classes.btn}
            variant="outlined"
            color="secondary"
            style={{ fontSize: "0.65rem", borderRadius: "2px" }}
            onClick={() => {
              props.onClick(x.content);
            }}
          >
            {x.content}
          </Button>
        ))}
      </div>
    );
  } else {
    return (
      //This empty react fragment will be returned if the Dual Rhymes are not there
      <></>
    );
  }
};

export default Sentences;
