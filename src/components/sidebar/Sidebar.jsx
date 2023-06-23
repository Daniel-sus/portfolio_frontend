import React from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-scroll";

import { ClickAwayListener, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Tooltip from "@mui/material/Tooltip";
import LinkMui from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { setMode } from "../../state/globalSlice";

import "./Sidebar.scss";

const Sidebar = ({ navBottomOpen, setNavBottomOpen }) => {
  const sidebarLinks = ["about", "projects", "stack", "experience", "contact"];
  const { mode } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    setAnchorEl(null);
    i18n.changeLanguage(lang.toLowerCase());
    localStorage.setItem("language", lang.toLowerCase());
  };

  const changeTheme = (theme) => {
    dispatch(setMode(theme));
    localStorage.setItem("theme", theme);
  };

  return (
    <ClickAwayListener onClickAway={() => setNavBottomOpen(false)}>
      <div className="sidebar">
        <div className="sidebar__settings">
          <Tooltip disableTouchListener title={t("sidebar_tooltip1")} placement="right">
            <LanguageIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                transition: "0.3s",
                "&:hover": { scale: "1.05" },
              }}
              className="icon"
              fontSize="large"
            />
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("English")}>English</MenuItem>
            <MenuItem onClick={() => handleClose("Ukrainian")}>Ukrainian</MenuItem>
          </Menu>
          <Tooltip disableTouchListener title={t("sidebar_tooltip2")} placement="right">
            <div>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined
                  onClick={() => changeTheme("light")}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { scale: "1.05" },
                  }}
                  className="theme__icon"
                  fontSize="large"
                />
              ) : (
                <LightModeOutlined
                  onClick={() => changeTheme("dark")}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { scale: "1.05" },
                  }}
                  className="theme__icon"
                  fontSize="large"
                />
              )}
            </div>
          </Tooltip>
        </div>
        <div className="sidebar__dots">
          {sidebarLinks.map((item, index) => (
            <div key={index}>
              <Link
                activeClass={mode === "dark" ? "active--dot--dark" : "active--dot"}
                className="link--dot"
                spy
                to={item}
              >
                <div className={mode === "dark" ? "dot dot--dark" : "dot"}></div>
              </Link>
              <Link
                className={
                  mode === "dark"
                    ? "header__links link--dark mobile--menu-links"
                    : "header__links mobile--menu-links"
                }
                key={item}
                activeClass={mode === "dark" ? "active--link--dark" : "active--link"}
                spy
                to={item}
                onClick={() => setNavBottomOpen(!navBottomOpen)}
              >
                {t(`nav_${item}`)}
              </Link>
            </div>
          ))}
        </div>
        <div className="sidebar__social-media-links">
          <Tooltip disableTouchListener title="GitHub" placement="right">
            <LinkMui
              href="https://github.com/Daniel-sus"
              target="_blank"
              color="black"
              underline="none"
            >
              <GitHubIcon
                color="secondary"
                sx={{
                  transition: "0.3s",
                  "&:hover": { scale: "1.05" },
                }}
                className="link"
                fontSize="large"
              />
            </LinkMui>
          </Tooltip>

          <Tooltip disableTouchListener title="Telegram" placement="right">
            <LinkMui href="https://t.me/daniel7375" target="_blank" color="black" underline="none">
              <TelegramIcon
                color="secondary"
                sx={{
                  transition: "0.3s",
                  "&:hover": { scale: "1.05" },
                }}
                className="link"
                fontSize="large"
              />
            </LinkMui>
          </Tooltip>
          <Tooltip disableTouchListener title="LinkedIn" placement="right">
            <LinkMui
              href="https://www.linkedin.com/in/daniel-yaroshovets-🇺🇦-84184a247/"
              target="_blank"
              color="black"
              underline="none"
            >
              <LinkedInIcon
                color="secondary"
                sx={{
                  transition: "0.3s",
                  "&:hover": { scale: "1.05" },
                }}
                className="link"
                fontSize="large"
              />
            </LinkMui>
          </Tooltip>
        </div>
        <div className="sidebar__mobile--burger">
          <div className="dan">{t("sidebar_name")}</div>
          <div className="cross__wrapper">
            <div
              className={
                navBottomOpen
                  ? "sidebar--cross--opened  sidebar--menu--item"
                  : "sidebar--cross sidebar--menu--item"
              }
              onClick={() => setNavBottomOpen(!navBottomOpen)}
            >
              <CloseIcon fontSize="large" />
            </div>
            <div
              className={
                navBottomOpen
                  ? "sidebar--settings--opened sidebar--menu--item"
                  : "sidebar--settings sidebar--menu--item"
              }
              onClick={() => setNavBottomOpen(!navBottomOpen)}
            >
              <SettingsIcon fontSize="large" />
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Sidebar;
