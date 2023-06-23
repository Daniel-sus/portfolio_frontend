import React from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Link, Typography } from "@mui/material";

import AppWrap from "../../wrapper/AppWrap";
import { client, urlFor } from "../../client";

import "./Experience.scss";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const secondContainer = {
  hidden: {
    y: -2,
  },
  visible: {
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Experience = () => {
  const [experience, setExperience] = React.useState([]);
  const [selected, setSelected] = React.useState(0);

  const { mode } = useSelector((state) => state.global);

  const { t, i18n } = useTranslation();

  const changeSelected = (index) => {
    setSelected(index);
  };

  React.useEffect(() => {
    const query = '*[_type == "experience"] | order(year desc)';

    client.fetch(query).then((data) => {
      setExperience(data);
    });
  }, []);

  return (
    <div className="experience">
      <Typography variant="h1" textTransform="uppercase">
        {t("experience_title")}
      </Typography>
      <div className="experience__wrapper">
        <div className="experince__container">
          <div className="experience__list">
            <div className={mode === "light" ? "line" : "line line--dark"}></div>
            {experience.map((item, index) => (
              <div
                onClick={() => changeSelected(index)}
                key={index}
                className={index === selected ? "exp" : "exp exp--gray"}
              >
                <div className={mode === "light" ? "dot" : "dot dot--dark"}></div>
                <div className="exp__years">{item.year}</div>
                <div className="exp__company">
                  <div className="exp__position">
                    {" "}
                    {i18n.language === "english" ? item.jobName : item.jobNameUkr}
                  </div>
                  <div className="exp__company-name">{item.companyName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {experience.map(
          (job, index) =>
            index === selected && (
              <motion.div
                key={index}
                className="work"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                <motion.h3 className="work__title" variants={item}>
                  {i18n.language === "english" ? job.jobName : job.jobNameUkr}
                </motion.h3>
                <motion.p className="work__description" variants={item}>
                  {i18n.language === "english" ? job.description : job.descriptionUkr}
                </motion.p>
                <motion.div variants={item}>
                  <Link
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                    color="secondary.link"
                    className="work__link"
                    href={job.link}
                  >
                    {job.link}
                  </Link>
                </motion.div>

                <motion.h6 className="work__tech-title" variants={item}>
                  {t("modal_tech")}
                </motion.h6>
                <motion.div className="work__tech-array" variants={secondContainer}>
                  {job.tech.map((icon__img, index) => (
                    <motion.div key={index} className="tech" variants={item}>
                      <img className="tech__icon" src={urlFor(icon__img)} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export default AppWrap(Experience, "experience");
