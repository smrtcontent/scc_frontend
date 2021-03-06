import { React, useState } from "react";
import clsx from "clsx";
import TextEditor from "../textEditor";
import {
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Footer from "../footer";
import customDrawerMobile from "../../app/themes/customDrawerMobile";
import SaveFile from "./DrawerButtons/saveFile";
import OpenFile from "./DrawerButtons/openFile";

export default function MiniDrawer() {
  const classes = customDrawerMobile();
  const theme = useTheme();
  const [name, setName] = useState("");
  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openFileContent, setOpenFileContent] = useState("");

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
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h5"
              style={{
                fontWeight: 550,
                marginLeft: "-18px",
                color: "white",
              }}
              noWrap
            >
              Smart Content Creator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
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
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.items}>
            <SaveFile
              content={content}
              name={name}
              saved={saved}
              setSaved={setSaved}
              setName={setName}
            />
            <OpenFile
              name={name}
              setName={setName}
              setSaved={setSaved}
              openFileContent={openFileContent}
              setOpenFileContent={setOpenFileContent}
            />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TextEditor
            setContent={setContent}
            name={name}
            saved={saved}
            setSaved={setSaved}
            setName={setName}
            openFileContent={openFileContent}
            setOpenFileContent={setOpenFileContent}
          />
          <Footer />
        </main>
      </div>
    </>
  );
}
