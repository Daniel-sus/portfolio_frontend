import React from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";

import AppWrap from "../../wrapper/AppWrap";
import { client, urlFor } from "../../client";

import "./Stack.scss";

const Stack = () => {
  const [stack, setStack] = React.useState([]);

  const { mode } = useSelector((state) => state.global);
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    const query = '*[_type == "stack"] | order(_createdAt asc)';

    client.fetch(query).then((data) => {
      setStack(data);
    });
  }, []);

  return (
    <div className="stack">
      <Typography variant="h1" textTransform="uppercase">
        {t("stack_title")}
      </Typography>
      <div className="stack__block">
        {stack.map((skill) => (
          <div className="stack__item" key={skill.skillType}>
            <Typography variant="h3" className="title">
              {i18n.language === "english" ? skill.skillType : skill.skillTypeUkr}
            </Typography>
            <div className="skills__list">
              {skill?.skillsArray &&
                skill.skillsArray.map((item, index) => (
                  <div className="skills__item" key={index}>
                    <img
                      className={
                        skill.skillType === "Languages" ? "skills__image-flag" : "skills__image"
                      }
                      src={
                        item.title === "React router"
                          ? mode === "light"
                            ? urlFor(item.imgUrl)
                            : urlFor(item.imgUrlDark)
                          : urlFor(item.imgUrl)
                      }
                      alt="icon"
                    />
                    <p className="skills__title">{item.title}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(Stack, "stack");
