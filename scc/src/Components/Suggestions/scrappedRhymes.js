import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(0.5),
  },
}));

const ScrappedRhymes = (props) => {
  const classes = useStyles();
  // const scrappedRhymes = [];

  // const source = () => {
  //   props.scrappedRhymes.map((x, index) => {
  //     scrappedRhymes.push(
  //       <div className="row">
  //         <strong key={index} className=" col-10">
  //           {x.source.split(",")[0]} + {x.source.split(",")[1]}
  //         </strong>
  //       </div>
  //     );
  //     if (x.combined.split(",")[1]) {
  //       scrappedRhymes.push(
  //         <div className="row">
  //           <Button
  //             key={index}
  //             size="small"
  //             className={classes.btn}
  //             variant="outlined"
  //             color="secondary"
  //             onClick={() => props.onClick(x.combined.split(",")[0])}
  //           >
  //             {" "}
  //             {x.combined.split(",")[0]}{" "}
  //           </Button>
  //           <Button
  //             key={index + 100000}
  //             size="small"
  //             className={classes.btn}
  //             variant="outlined"
  //             color="secondary"
  //             onClick={() => props.onClick(x.combined.split(",")[1])}
  //           >
  //             {" "}
  //             {x.combined.split(",")[1]}{" "}
  //           </Button>
  //         </div>
  //       );
  //     } else {
  //       scrappedRhymes.push(
  //         <div className="row">
  //           <Button
  //             key={index}
  //             size="small"
  //             className={classes.btn + " offset-md-2 col-5 "}
  //             variant="outlined"
  //             color="secondary"
  //             onClick={() => props.onClick(x.combined.split(",")[0])}
  //           >
  //             {" "}
  //             {x.combined.split(",")[0]}{" "}
  //           </Button>
  //         </div>
  //       );
  //     }
  //     return 1;
  //   });
  // };

  // source();

  // This is the return module for the scrapped rhymes component
  // This will check if the props contain scrapped rhymes or not
  if (props.scrappedRhymes.length > 0) {
    // This section will be returned only if the props contains scrapped rhymes
    return (
      <div id="scroll-blue" className="suggestions pl-2">
        {props.scrappedRhymes.map((x, index) => (
          <Button
            key={index}
            size="small"
            className={classes.btn}
            variant="outlined"
            color="secondary"
            style={{ fontSize: "0.65rem", borderRadius: "2px" }}
            onClick={() => {
              props.onClick(x);
            }}
          >
            {x}
          </Button>
        ))}
      </div>
    );
  } else {
    return (
      //This empty react fragment will be returned if the Scrapped Rhymes are not there
      <></>
    );
  }
};

export default ScrappedRhymes;
