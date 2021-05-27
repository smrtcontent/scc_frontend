// import React from "react";
// import { Snackbar } from "@material-ui/core/";
// import { makeStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import Collapse from "@material-ui/core/Collapse";
// import SuccessAlert from "../Alerts/success";

// console.log('tried opening the snackbar')

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// const SuccessSnackbar = (props) => {
//   const classes = useStyles();

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     props.setShow(false);
//   };

//   return (
//     <Snackbar open={props.show} autoHideDuration={6000} onClose={handleClose}>
//       <div className={classes.root}>
//         <Collapse in={props.show}>
//           <SuccessAlert
//             action={
//               <IconButton
//                 aria-label="close"
//                 color="inherit"
//                 size="small"
//                 onClick={handleClose}
//               >
//                 <CloseIcon fontSize="inherit" />
//               </IconButton>
//             }
//             variant="filled"
//             severity="success"
//           >
//             {props.message}
//           </SuccessAlert>
//         </Collapse>
//       </div>
//     </Snackbar>
//   );
// };
// export default SuccessSnackbar;
