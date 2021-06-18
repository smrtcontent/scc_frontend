import { makeStyles } from "@material-ui/core";

const customButton = makeStyles((theme) => ({
    root: {
        color: 'white',
        borderRadius: '2px',
        fontSize: '0.70rem',
        margin: '2px',
        boxShadow: "none",
        // 0 1.9px 3.2px -11px rgba(0, 0, 0, 0.059),
        // 0 4.5px 7.6px -11px rgba(0, 0, 0, 0.085),
        // 0 8.5px 14.3px -11px rgba(0, 0, 0, 0.105),
        // 0 15.2px 25.5px -11px rgba(0, 0, 0, 0.125),
        // 0 28.4px 47.6px -11px rgba(0, 0, 0, 0.151),
        // 0 68px 114px -11px rgba(0, 0, 0, 0.21)`,
    },
    center: {
      color: 'white',
      borderRadius: '2px',
      fontSize: '0.70rem',
      margin: '0px'
    }
}))

export default customButton