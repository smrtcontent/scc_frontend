import { createMuiTheme } from '@material-ui/core'
import { cyan, red, purple } from '@material-ui/core/colors'

const btnTheme = createMuiTheme({
    palette: {
        primary: {
        main: cyan[600],
        },
        secondary: {
            main: red[500],
        },
        textPrimary: {
            main: purple[500],
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: '2px',
            },
            text: {
                color: 'white',
                fontSize: '0.70rem',
            },
        }
    }
})

export default btnTheme