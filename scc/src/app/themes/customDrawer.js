import { makeStyles } from "@material-ui/core";

const drawerWidth = 180


const customDrawer = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowX: 'hidden',
    },

    appBar: {
        backgroundColor: '#1a237e',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },

    menuButton: {
        marginRight: 25,
        paddingLeft: 3,
    },

    hide: {
        display: 'none',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },

    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },

    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(6),
        },
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

    content: {
        backgroundColor: '#1e56a0',
        flexGrow: 1,
        // padding: theme.spacing(0),
    },

    items: {
        margin: '-2px',
        // zIndex: 1,
    },

    itemIcon: {
        margin: theme.spacing(0,2,0,0),
        color: '#163172',
        fontWeight: 100,
        height: '18px',
        width: 'auto',
    },

    itemText: {
    color: '#141414',
    fontSize: '0.80rem',
    paddingTop: '8px',
  }
}));

export default customDrawer