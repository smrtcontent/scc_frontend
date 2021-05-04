import React from 'react'
import clsx from 'clsx'
import TextEditor from '../textEditor'
import {
  withStyles, useTheme, Drawer, AppBar,
  Toolbar, List, CssBaseline, Typography, Divider, IconButton,
  ListItem, ThemeProvider,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { indigo } from '@material-ui/core/colors';
import Footer from '../footer'
import customDrawer from '../../app/themes/customDrawer'
import customListItem from './../../app/themes/customListItem'

export default function MiniDrawer() {
  const classes = customDrawer()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const ListItems = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "red",
        color: "white"
      },
      "&:hover": {
        backgroundColor: indigo[100],
        backdropFilter: 'blur(1px)',
      }
    },
    selected: {}
  })(ListItem);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              style={{ 
                fontWeight: 550,
                marginLeft: '-18px',
              }}
              noWrap>
              Smart Content Creator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <ThemeProvider theme={customListItem}>
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List className={classes.items}>
              {[{text : 'Open New', icon : <PostAddIcon/>}, 
                {text : 'Open New', icon : <SaveAltIcon />},
              ].map((x, index) => (
                <ListItems 
                  button 
                  key={index} 
                  onClick={() => alert(x.text)}>
                  <span
                    className = {classes.itemIcon}
                  >{x.icon}
                  </span>
                  <span 
                    className={classes.itemText}
                  >
                    {x.text}
                  </span>
                </ListItems>
              ))}
            </List>
          </ThemeProvider>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TextEditor />
          <Footer />
        </main>
      </div>
    </>
  )
}
