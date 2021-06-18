import { makeStyles } from "@material-ui/core";

const customCard = makeStyles((theme) => ({
  root: {
    borderRadius: "2px",
    fontSize: "0.65rem",
    marginTop: "1px",
    boxShadow: `
  0 1.9px 3.2px -11px rgba(0, 0, 0, 0.059),
  0 4.5px 7.6px -11px rgba(0, 0, 0, 0.085),
  0 8.5px 14.3px -11px rgba(0, 0, 0, 0.105),
  0 15.2px 25.5px -11px rgba(0, 0, 0, 0.125),
  0 28.4px 47.6px -11px rgba(0, 0, 0, 0.151),
  0 68px 114px -11px rgba(0, 0, 0, 0.21)`,
  },
  suggestions: {
    borderRadius: "2px",
    userSelect: "none",
    maxHeight: "67vh",
    height: "67vh",
    minHeight: "67vh",
    width: "auto",
    marginTop: "1px",
    boxShadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
        0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
        0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
        0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
        0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
        0 74px 65px -19px rgba(0, 0, 0, 0.1);`,
  },
  legends: {
    borderRadius: "2px",
    userSelect: "none",
    fontSize: "0.65rem",
    margin: "10px 1px 1px 1px",
    boxShadow: `0 2px 1.8px -19px rgba(0, 0, 0, 0.028),
        0 4.9px 4.3px -19px rgba(0, 0, 0, 0.04),
        0 9.3px 8.1px -19px rgba(0, 0, 0, 0.05),
        0 16.5px 14.5px -19px rgba(0, 0, 0, 0.06),
        0 30.9px 27.2px -19px rgba(0, 0, 0, 0.072),
        0 74px 65px -19px rgba(0, 0, 0, 0.1);`,
  },
}));

export default customCard;
