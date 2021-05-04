import { makeStyles } from "@material-ui/core";

const customCard = makeStyles((theme) => ({
    root: {
        borderRadius: '0px',
        fontSize: '0.65rem',
        margin: '1px'
    },
    suggestions: {
        borderRadius: '0px',
        maxHeight: '64vh',
        minHeight: '64vh',
        width: 'auto',
        margin: '1px'
    },
    legends: {
        borderRadius: '0px',
        fontSize: '0.65rem',
        margin: '10px 1px 1px 1px',
    }
}))

export default customCard