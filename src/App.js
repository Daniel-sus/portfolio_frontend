import React from "react";

import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { AppBar, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { Header, Sidebar, Modal } from "./components";
import { About, Projects, Stack, Experience, Contact } from "./pages";

import { themeSettings } from "./theme";
import "./app.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [navBottomOpen, setNavBottomOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalItem, setModalItem] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("primary");
  const { t } = useTranslation();
  const [text, setText] = React.useState(t("snackbar_text1"));

  const mode = useSelector((state) => state.global.mode);
  const mobileVersion = useMediaQuery("(max-width:920px)");

  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const onHandleClickProject = (project) => {
    setModalItem(project);
    setIsModalOpen(true);
  };

  const handleClick = (type, text) => {
    setSeverity(type === "success" ? "primary" : "error");
    setText(text);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container">
          <div
            className={
              navBottomOpen
                ? mode === "dark"
                  ? "container__sidebar sb__dark"
                  : "container__sidebar"
                : mode === "dark"
                ? "container__sidebar sb__opened sb__dark"
                : "container__sidebar sb__opened"
            }
          >
            <Sidebar navBottomOpen={navBottomOpen} setNavBottomOpen={setNavBottomOpen} />
          </div>
          <div className="container__main">
            <AppBar
              position="sticky"
              top="0"
              elevation={0}
              sx={{
                backgroundColor: "background.default",
                boxShadow: mobileVersion && "0px 0px 8px rgba(0, 0, 0, 0.10)",
                opacity: "96%",
              }}
            >
              <Header handleClick={handleClick} />
            </AppBar>
            <div className="container__content">
              <About />
              <Projects onHandleClickProject={onHandleClickProject} />
              <Stack />
              <Experience />
              <Contact handleClick={handleClick} />
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            sx={mobileVersion && { marginBottom: "70px" }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert severity={severity} sx={{ width: "100%" }}>
              {text}
            </Alert>
          </Snackbar>
        </div>
        <AnimatePresence>
          {isModalOpen ? (
            <Modal
              mobileVersion={mobileVersion}
              modalItem={modalItem}
              setIsModalOpen={setIsModalOpen}
            />
          ) : null}
        </AnimatePresence>
      </ThemeProvider>
    </div>
  );
};

export default App;
