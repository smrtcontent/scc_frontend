import { makeStyles } from "@material-ui/core";

const drawerWidth = 140;

const customDrawer = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowX: "hidden",
  },
  title: {
    fontFamily: "Oleo Script, cursive",
    fontSize: "2rem",
    fontWeight: 550,
    marginLeft: "-18px",
    userSelect: "none",
    color: "white",
    margin: theme.spacing(0, 2, 0, 2),
    padding: theme.spacing(0),
    shadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
        0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
        0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
        0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
        0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
        0 74px 65px -19px rgba(0, 0, 0, 0.1);`,
  },
  appBar: {
    backgroundColor: "#1a237e",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 25,
    paddingLeft: 3,
  },

  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawerOpen: {
    width: drawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6),
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  items: {
    margin: "-4px",
    fontWeight: "600",
    // zIndex: 1,
  },

  content: {
    backgroundColor: "#1e56a0",
    flexGrow: 1,
    // padding: theme.spacing(0),
  },
}));

export default customDrawer;
