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
import { isMobileOnly } from "react-device-detect";
import Footer from "../footer";
import customDrawer from "../../app/themes/customDrawer";
import customDrawerMobile from "../../app/themes/customDrawerMobile";
import SaveFile from "./DrawerButtons/saveFile";
import OpenFile from "./DrawerButtons/openFile";
import Download from "./DrawerButtons/download";
import NewFile from "./DrawerButtons/newFile";
import SaveFileAs from "./DrawerButtons/saveAs";

export default function MiniDrawer() {
  const classes = isMobileOnly ? customDrawerMobile() : customDrawer();
  const theme = useTheme();
  const [name, setName] = useState(); // Contains the file name
  const [content, setContent] = useState(); // Contains the current content written in the text editor
  const [open, setOpen] = useState(false); // open State of the drawer component
  const [saved, setSaved] = useState(false); // Contains if the file is saved or not (as bool value)
  const [openFileContent, setOpenFileContent] = useState("");
  const [newFile, setNewFile] = useState(false)
  const [fileId, setFileId] = useState()  // Stores the ID of current file

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
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Typography variant="h5" className={classes.title} noWrap>
              Smart Content Creator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={isMobileOnly ? "persistent" : "permanent"}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          anchor="left"
          open={open}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.items}>
            <NewFile 
              open={open} // To show or hide tooltip
              setSaved={setSaved}
              setName={setName}
              saved={saved}
              setOpenFileContent={setOpenFileContent}
              setNewFile={setNewFile}
              fileId = {fileId}
              setFileId={setFileId}
              content={content}
            />
            <SaveFile
              open={open} // To show or hide tooltip
              content={content}
              name={name}
              saved={saved}
              setSaved={setSaved}
              setName={setName}
              fileId = {fileId}
              setFileId={setFileId}
            />
            <SaveFileAs
              open={open} // To show or hide tooltip
              content={content}
              name={name}
              saved={saved}
              setSaved={setSaved}
              setName={setName}
              fileId = {fileId}
              setFileId={setFileId}
            />
            <OpenFile
              open={open}
              name={name}
              saved={saved}
              setName={setName}
              setSaved={setSaved}
              content={content}
              openFileContent={openFileContent}
              setOpenFileContent={setOpenFileContent}
              fileId = {fileId}
              setFileId={setFileId}
            />
            <Download content={content} open={open} name={name} />
            
          </List>
        </Drawer>
        <main className={classes.content} onClick={() => {if(isMobileOnly) handleDrawerClose()}}>
          <div className={classes.toolbar} />
          <TextEditor
            setContent={setContent}
            name={name}
            saved={saved}
            setSaved={setSaved}
            setName={setName}
            newFile = {newFile}
            setNewFile = {setNewFile}
            openFileContent={openFileContent}
            setOpenFileContent={setOpenFileContent}
            fileId={fileId}
            setFileId={setFileId}
          />
          <Footer />
        </main>
      </div>
    </>
  );
}
