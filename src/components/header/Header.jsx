import React from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";

import Tooltip from "@mui/material/Tooltip";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkMui from "@mui/material/Link";

import Pdf from "../../assets/Resume.pdf";

import "./Header.scss";

const headerLinks = ["about", "projects", "stack", "experience", "contact"];

const Header = ({ handleClick }) => {
  const { mode } = useSelector((state) => state.global);
  const { t } = useTranslation();

  const emailOnHandleClick = () => {
    navigator.clipboard.writeText("dan.yaroshovets@gmail.com");
    handleClick("success", t("snackbar_text1"));
  };

  return (
    <header className="header">
      <div className="header__list">
        <div className="sidebar__social-media-links socialmedia">
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
        {headerLinks.map((item, index) => (
          <Link
            className={mode === "dark" ? "header__links link--dark" : "header__links"}
            key={item}
            activeClass={mode === "dark" ? "active--link--dark" : "active--link"}
            spy
            to={item}
          >
            {t(`nav_${item}`)}
          </Link>
        ))}
      </div>
      <div className="header__contacts">
        <Tooltip disableTouchListener title={t("header_tooltip1")} placement="bottom">
          <LinkMui href={Pdf} target="_blank" color="black" underline="none">
            <InsertDriveFileOutlinedIcon
              color="secondary"
              sx={{
                transition: "0.3s",
                "&:hover": { scale: "1.05" },
              }}
              fontSize="large"
            />
          </LinkMui>
        </Tooltip>
        <Tooltip disableTouchListener title={t("header_tooltip2")} placement="bottom">
          <EmailOutlinedIcon
            fontSize="large"
            sx={{
              transition: "0.3s",
              "&:hover": { scale: "1.05" },
            }}
            onClick={emailOnHandleClick}
          />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
