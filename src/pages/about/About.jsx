import React from "react";

import { useTranslation } from "react-i18next";
import { Cursor, useTypewriter } from "react-simple-typewriter";

import AppWrap from "../../wrapper/AppWrap";
import resume from "../../assets/Resume.pdf";

import "./About.scss";
import { useSelector } from "react-redux";

const About = () => {
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.global);
  const [text] = useTypewriter({
    words: [t("about_title")],
    loop: true,
  });

  return (
    <div className="about">
      <div className="about__block">
        <h1 className="about__title">
          <span>{text}</span>
          <Cursor />
        </h1>
        <h3 className="about__subtitle">{t("about_subtitle")}</h3>
        <a download="" href={resume}>
          <button className={mode === "dark" ? "about__button about--btn--dark" : "about__button"}>
            {t("about_button")}
          </button>
        </a>
      </div>
      <div className="about__image">
        <div className="image"></div>
      </div>
    </div>
  );
};

export default AppWrap(About, "about");
