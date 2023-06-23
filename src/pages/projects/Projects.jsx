import React from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { GitHub, VisibilityOutlined } from "@mui/icons-material";

import AppWrap from "../../wrapper/AppWrap";
import { client, urlFor } from "../../client";

import "./Projects.scss";

const Projects = ({ onHandleClickProject }) => {
  const [projects, setProjects] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState(0);

  const { mode } = useSelector((state) => state.global);
  const { t, i18n } = useTranslation();

  const filters = [
    i18n.language === "english" ? "All" : "Всі",
    "Fullstack",
    "OOP",
    "TypeScript",
    "React",
  ];

  React.useEffect(() => {
    const query = '*[_type == "projects"]';

    client.fetch(query).then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <div className="projects">
      <Typography variant="h1" textTransform="uppercase">
        {t("projects_title")}
      </Typography>
      <div className="projects__wrapper">
        <div className="filter__list">
          {filters.map((filter, index) => (
            <div
              key={index}
              className={
                index === selectedFilter
                  ? mode === "dark"
                    ? "filter filter--selected--dark"
                    : "filter filter--selected"
                  : mode === "dark"
                  ? "filter filter--dark"
                  : "filter"
              }
              onClick={() => setSelectedFilter(index)}
            >
              <p className="filter__name">{filter}</p>
            </div>
          ))}
        </div>
        <div className="projects__list">
          {projects
            .filter((project) =>
              selectedFilter === 0
                ? true
                : project.tags
                ? project.tags.includes(filters[selectedFilter])
                : false
            )
            .map((project, index) => (
              <div key={index} className="project" onClick={() => onHandleClickProject(project)}>
                <Typography variant="h5" className="project__title">
                  {project.title}
                </Typography>
                <div className="project__image--wrapper">
                  {project?.imagesArray && (
                    <img className="image" src={urlFor(project.imagesArray[0])} alt="image" />
                  )}
                  <motion.div
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                    }}
                    className="image--overlay-hover app__flex"
                  >
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <VisibilityOutlined />
                      </motion.div>
                    </a>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={project.codeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <GitHub />
                      </motion.div>
                    </a>
                  </motion.div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AppWrap(Projects, "projects");
