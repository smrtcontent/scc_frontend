import { makeStyles } from "@material-ui/core";

const customButton = makeStyles((theme) => ({
    root: {
        color: 'white',
        borderRadius: '2px',
        fontSize: '0.70rem',
        margin: '3px'
    },
    center: {
      color: 'white',
      borderRadius: '2px',
      fontSize: '0.70rem',
      margin: '0px'
    }
}))

export default customButton