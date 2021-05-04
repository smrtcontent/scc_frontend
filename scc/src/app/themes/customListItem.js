import {createMuiTheme} from '@material-ui/core'

const customListItem = createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          margin: '0px',
    },
      },
    },
  });

  export default customListItem